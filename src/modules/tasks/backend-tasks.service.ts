import {Injectable, Injector} from '@angular/core';

import {
  API_CTRL_TASK_EXEC,
  API_CTRL_TASK_GET_METADATA_VALUE,
  API_CTRL_TASK_LOG,
  API_CTRL_TASK_STATUS,
  API_CTRL_TASKS_METADATA
} from '@typexs/server';
import {Tasks} from '@typexs/base';
import {IEntityRefMetadata} from 'commons-schema-api';
import {Observable, Subject, combineLatest, timer} from 'rxjs';
import * as _ from 'lodash';
import {C_WORKERS} from '@typexs/base/libs/worker/Constants';
import {SystemInfoService} from '../base/services/system-info.service';
import {TaskEvent} from '@typexs/base/libs/tasks/worker/TaskEvent';
import {TaskLog} from '@typexs/base/entities/TaskLog';
import {SystemNodeInfo} from '@typexs/base/entities/SystemNodeInfo';
import {ExprDesc} from 'commons-expressions/browser';
import {IMessageOptions} from '@typexs/base/libs/messaging/IMessageOptions';
import {ITaskExectorOptions} from '@typexs/base/libs/tasks/ITaskExectorOptions';
import {IApiCallOptions} from '../base/lib/http/IApiCallOptions';
import {filter, first, mergeMap, takeUntil, tap} from 'rxjs/operators';
import {Log} from '../base/lib/log/Log';
import {AbstractQueryService} from '../base/api/querying/abstract-query.service';
import {AppService} from '../base/services/app.service';
import {StorageService} from '../storage/storage.service';
import {BackendService} from '../base/api/backend/backend.service';


/**
 * API_CTRL_TASK_*
 */
// API_CTRL_TASK_GET_METADATA
// API_CTRL_TASK_RUNNING
// API_CTRL_TASKS_RUNNERS_INFO
// API_CTRL_TASKS_RUNNING_ON_NODE
// API_CTRL_TASKS_LIST
// API_CTRL_TASKS_RUNNING


@Injectable()
export class BackendTasksService {

  queryService: AbstractQueryService;

  tasks: Tasks;

  prefix = '/tasks';

  workerNodes: SystemNodeInfo[] = [];


  constructor(private backend: BackendService,
              private infoService: SystemInfoService,
              private appService: AppService,
              private injector: Injector) {
    let serviceClass: Function = appService.getService('taskQueryService');
    if (!serviceClass || !_.isFunction(serviceClass)) {
      serviceClass = StorageService;
    }
    this.queryService = injector.get(serviceClass);
  }

  // TODO
  // load componentRegistryService from Backend and check which mode is enabled
  // 'local store' or 'distribued'. Cause of the select the correct
  // query handle
  loadConfig() {
  }


  execute(name: string, parameters: any = {}, targetIds: string[] = [], options: ITaskExectorOptions = {}): Observable<TaskEvent[]> {
    return this.backend.callApi(API_CTRL_TASK_EXEC,
      {
        params: {
          taskName: name
        },
        query: {params: parameters, targetIds: targetIds, options: options}
      });
  }


  setNgUrlPrefix(prefix: string) {
    this.prefix = prefix;
  }

  getNgUrlPrefix() {
    return this.prefix;
  }

  hasWorkerNodes() {
    return !_.isEmpty(this.workerNodes);
  }

  getWorkerNodes() {
    return this.workerNodes;
  }

  getQueryService() {
    return this.queryService;
  }


  query(query: any, options: any) {
    return this.queryService.query(TaskLog.name, query, options);
  }

  aggregate(aggr: any[], options: any) {
    return this.queryService.aggregate(TaskLog.name, aggr, options);
  }

  /**
   *
   * @param runnerId
   * @param options
   */
  getTaskStatus(runnerId: string, options?: IMessageOptions): Observable<TaskLog> {
    const apiOptions: IApiCallOptions = {
      params: {runnerId: runnerId},
    };
    if (options) {
      apiOptions.query = {options: options};
    }
    return this.backend.callApi(API_CTRL_TASK_STATUS, apiOptions);
  }


  /**
   * Returns task status information (TaskLog) till process not running
   *
   * @param runnerId
   * @param options
   */
  taskStatus(runnerId: string, options?: IMessageOptions & { interval?: number }): Observable<TaskLog> {
    options = options || {};
    _.defaults(options, {interval: 5000});

    const subject = new Subject();
    const repeat$:
      Observable<TaskLog> =
      timer(0, options.interval)
        .pipe(takeUntil(subject))
        .pipe(mergeMap(x => this.getTaskStatus(runnerId, options)))
        .pipe(tap(x => {
            if (_.isArray(x)) {
              let running = true;
              for (const y of x) {
                running = running && y.running;
              }
              if (!running) {
                subject.next();
                subject.complete();

              }
            }
          })
        );
    return repeat$;
  }


  getTaskLog(runnerId: string,
             nodeId: string,
             from: number = null,
             offset: number = null,
             tail: number = 50): Observable<any[]> {
    const opts: any = {};
    if (_.isNumber(from) &&
      _.isNumber(offset) && from >= 0 && offset >= 0
    ) {
      opts.offset = from;
      opts.limit = offset;
    } else if (_.isNumber(from) && from >= 0) {
      opts.offset = from;
    } else {
      opts.tail = tail;
    }
    return this.backend.callApi(API_CTRL_TASK_LOG,
      {params: {nodeId: nodeId, runnerId: runnerId}, query: opts});
  }


  getTaskList(refresh: boolean = false): Observable<Tasks> {
    const x = new Subject<Tasks>();
    if (refresh || !this.tasks) {
      const sub = combineLatest([
        this.infoService.getNode().pipe(filter(x => !!x)).pipe(first()),
        this.infoService.getNodes().pipe(filter(x => !!x)).pipe(first())
      ])
        .subscribe(refreshed => {
          if (!refreshed) {
            return;
          }

          // filter worker with task_queue_worker
          const nodes: SystemNodeInfo[] = this.infoService.allNodes;
          this.workerNodes = _.filter(nodes, c => {
            const x = _.find(c.contexts, cc => cc.context === C_WORKERS);
            if (x) {
              return !!_.find(x.workers, w => w.name === 'task_queue_worker');
            }
            return false;
          });

          this.backend.callApi(API_CTRL_TASKS_METADATA).subscribe(
            (data: IEntityRefMetadata[]) => {
              this.tasks = new Tasks(null);
              data.forEach((d: any) => {
                d.nodeIds = _.intersection(d.nodeIds, this.workerNodes.map(w => w.nodeId));
                this.tasks.fromJson(d);
              });
              x.next(this.tasks);
            },
            error => {
              Log.error(error);
            },
            () => {
              x.complete();
            }
          );
        });

    } else {
      x.next(this.tasks);
      x.complete();
    }
    return x.asObservable();
  }


  /**
   * Backend callback to get the allowed values for an incoming parameter
   *
   * @param runnerId
   * @param nodeId
   */
  getTaskIncomingValues(taskName: string, incomingName: string, hint: ExprDesc = null, instance: any = null): Observable<any> {
    const opts: any = {};
    if (hint) {
      opts.hint = hint.toJson();
    }
    if (instance) {
      opts.instance = instance;
    }

    return this.backend.callApi(API_CTRL_TASK_GET_METADATA_VALUE, {
        params: {taskName: taskName, incomingName: incomingName}, query: opts
      }
    );
  }

}
