import {Injectable} from '@angular/core';

import {
  API_CTRL_TASK_EXEC,
  API_CTRL_TASK_GET_METADATA_VALUE,
  API_CTRL_TASK_LOG,
  API_CTRL_TASK_STATUS,
  API_CTRL_TASKS_METADATA
} from '@typexs/server/browser';
import {Tasks} from '@typexs/base/browser';
import {IEntityRefMetadata} from 'commons-schema-api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as _ from 'lodash';
import {C_WORKERS} from '@typexs/base/libs/worker/Constants';
import {BackendClientService} from '../base/backend-client.service';
import {SystemInfoService} from '../base/system-info.service';
import {TaskEvent} from '@typexs/base/libs/tasks/worker/TaskEvent';
import {TaskLog} from '@typexs/base/entities/TaskLog';
import {SystemNodeInfo} from '@typexs/base/entities/SystemNodeInfo';
import {ExprDesc} from 'commons-expressions/browser';
import {IMessageOptions} from '@typexs/base/libs/messaging/IMessageOptions';
import {ITaskExectorOptions} from '@typexs/base/libs/tasks/ITaskExectorOptions';
import {IApiCallOptions} from '../base/lib/http/IApiCallOptions';

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

  tasks: Tasks;

  prefix = '/tasks';

  workerNodes: SystemNodeInfo[] = [];


  constructor(private http: BackendClientService,
              private infoService: SystemInfoService) {
  }


  execute(name: string, parameters: any = {}, targetIds: string[] = [], options: ITaskExectorOptions = {}): Observable<TaskEvent[]> {
    return this.http.callApi(API_CTRL_TASK_EXEC,
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

  taskStatus(runnerId: string, options?: IMessageOptions): Observable<TaskLog> {
    const apiOptions: IApiCallOptions = {
      params: {runnerId: runnerId},
    };
    if (options) {
      apiOptions.query = {options: options};
    }
    return this.http.callApi(API_CTRL_TASK_STATUS, apiOptions);
  }


  taskLog(runnerId: string,
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
    return this.http.callApi(API_CTRL_TASK_LOG,
      {params: {nodeId: nodeId, runnerId: runnerId}, query: opts});
  }


  taskList(refresh: boolean = false): Observable<Tasks> {
    const x = new Subject<Tasks>();
    if (refresh || !this.tasks) {
      this.infoService.refresh()
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

          this.http.callApi(API_CTRL_TASKS_METADATA, {
            handle:
              (err, data: IEntityRefMetadata[]) => {
                this.tasks = new Tasks(null);
                data.forEach((d: any) => {
                  d.nodeIds = _.intersection(d.nodeIds, this.workerNodes.map(w => w.nodeId));
                  this.tasks.fromJson(d);
                });
                x.next(this.tasks);
                x.complete();
              }
          });
        }, error => console.error(error));

    } else {
      x.next(this.tasks);
    }
    return x.asObservable();
  }


  /**
   * Backend callback to get the allowed values for an incoming parameter
   *
   * @param runnerId
   * @param nodeId
   */
  taskIncomingValues(taskName: string, incomingName: string, hint: ExprDesc = null, instance: any = null): Observable<any> {
    const opts: any = {};
    if (hint) {
      opts.hint = hint.toJson();
    }
    if (instance) {
      opts.instance = instance;
    }

    return this.http.callApi(API_CTRL_TASK_GET_METADATA_VALUE, {
        params: {taskName: taskName, incomingName: incomingName}, query: opts
      }
    );
  }

}
