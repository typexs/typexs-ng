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
    return this.http.callApi(API_CTRL_TASK_STATUS, {params: {runnerId: runnerId}, query: {options: options}});
  }

  taskLog(runnerId: string, nodeId: string, from: number = null, offset: number = null, tail: number = 50): Observable<any[]> {
    // const x = new Subject<any[]>();

    // let apiUrl = this.api + API_CTRL_TASK_LOG.replace(':nodeId', nodeId).replace(':runnerId', runnerId);
    const opts: any = {};
    if (_.isNumber(from) && _.isNumber(offset) && from >= 0 && offset >= 0) {
      // apiUrl += `?from=${from}&offset=${offset}`;
      opts.from = from;
      opts.offset = offset;
    } else if (_.isNumber(from) && from >= 0) {
      // apiUrl += `?from=${from}`;
      opts.from = from;
    } else {
      // apiUrl += `?tail=${tail}`;
      opts.tail = tail;
    }
    //
    // this.http.get({apiUrl: apiUrl, logging: false}, (err: HttpResponseError, data: any[]) => {
    //   if (err) {
    //     x.error(err);
    //   } else {
    //     x.next(data);
    //   }
    //   x.complete();
    // });
    // return x.asObservable();
    return this.http.callApi(API_CTRL_TASK_LOG, {params: {nodeId: nodeId, runnerId: runnerId}, query: opts});
  }


  taskList(refresh: boolean = false): Observable<Tasks> {
    const x = new Subject<Tasks>();
    if (refresh || !this.tasks) {
      this.infoService.refresh().subscribe(noop => {
        // filter worker with task_queue_worker
        const nodes = _.concat([], [this.infoService.node], this.infoService.nodes);
        this.workerNodes = _.filter(nodes, c => {
          // tslint:disable-next-line:no-shadowed-variable
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
      });

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
    // const x = new Subject<any>();
    //
    // let _url = this.api + API_CTRL_TASK_GET_METADATA_VALUE
    //   .replace(':taskName', taskName)
    //   .replace(':incomingName', incomingName);

    const opts: any = {};
    if (hint) {
      opts.hint = hint.toJson();
      // queries.push('hint=' + JSON.stringify(hint.toJson()));
    }
    if (instance) {
      opts.instance = instance;
      // queries.push('instance=' + JSON.stringify(instance));

    }
    //
    // if (queries.length > 0) {
    //   _url += '?' + queries.join('&');
    // }
    //
    // this.http.get(_url, (err, data: any) => {
    //   if (err) {
    //     x.error(err);
    //   } else {
    //     x.next(data);
    //   }
    //   x.complete();
    // });
    //
    // return x.asObservable();
    return this.http.callApi(API_CTRL_TASK_GET_METADATA_VALUE, {params: {taskName: taskName, incomingName: incomingName}, query: opts});

  }

}
