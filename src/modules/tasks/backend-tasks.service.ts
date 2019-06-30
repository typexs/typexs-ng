import {Injectable} from '@angular/core';

import {API_TASK_EXEC, API_TASK_LOG, API_TASK_STATUS, API_TASKS_METADATA} from '@typexs/server/browser';
import {Tasks} from '@typexs/base/browser';
import {IEntityRefMetadata} from 'commons-schema-api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import * as _ from 'lodash';
import {C_WORKERS} from '@typexs/base/libs/worker/Constants';
import {HttpClientWrapper} from '../system/http-client-wrapper.service';
import {SystemInfoService} from '../system/system-info.service';
import {TaskEvent} from '@typexs/base/libs/tasks/worker/TaskEvent';
import {TaskLog} from '@typexs/base/entities/TaskLog';
import {SystemNodeInfo} from '@typexs/base';
import {HttpResponseError} from '@typexs/server';


@Injectable()
export class BackendTasksService {

  api = '/api';

  tasks: Tasks;

  prefix = '/tasks';

  workerNodes: SystemNodeInfo[] = [];


  constructor(private http: HttpClientWrapper,
              private infoService: SystemInfoService) {
  }


  execute(name: string, parameters: any = {}, targetIds: string[] = []): Observable<TaskEvent> {
    const obs = new Subject<TaskEvent>();
    const queryParts = [];
    if (_.isPlainObject(parameters) && !_.isEmpty(parameters)) {
      queryParts.push('parameters=' + JSON.stringify(parameters));
    }

    if (_.isArray(targetIds) && !_.isEmpty(targetIds)) {
      queryParts.push('targetIds=' + JSON.stringify(targetIds));
    }

    let url = this.api + API_TASK_EXEC.replace(':taskName', name);
    if (queryParts.length > 0) {
      url += '?' + queryParts.join('&');
    }

    this.http.get(url, (err, data: TaskEvent) => {
      if (err) {
        obs.error(err);
      } else {
        obs.next(data);
      }
      obs.complete();
    });

    return obs.asObservable();
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

  taskStatus(runnerId: string, nodeId: string): Observable<TaskLog> {
    const x = new Subject<TaskLog>();

    this.http.get(this.api + '/' + API_TASK_STATUS.replace(':nodeId', nodeId)
      .replace(':runnerId', runnerId), (err, data: TaskLog) => {
      if (err) {
        x.error(err);
      } else {
        x.next(data);
      }
      x.complete();
    });

    return x.asObservable();
  }

  taskLog(runnerId: string, nodeId: string, from: number = null, offset: number = null, tail: number = 50): Observable<any[]> {
    const x = new Subject<any[]>();

    let url = this.api + '/' + API_TASK_LOG.replace(':nodeId', nodeId).replace(':runnerId', runnerId);
    if (from && offset && _.isNumber(from) && _.isNumber(offset)) {
      url += `?from=${from}&offset=${offset}`;
    } else if (from && _.isNumber(from)) {
      url += `?from=${from}`;
    } else {
      url += `?tail=${tail}`;
    }

    this.http.get({url: url, logging: false}, (err: HttpResponseError, data: any[]) => {
      if (err) {
        x.error(err);
      } else {
        x.next(data);
      }
      x.complete();
    });
    return x.asObservable();
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


        this.http.get(this.api + '/' + API_TASKS_METADATA, (err, data: IEntityRefMetadata[]) => {
          this.tasks = new Tasks(null);
          data.forEach((d: any) => {
            d.nodeIds = _.intersection(d.nodeIds, this.workerNodes.map(w => w.nodeId));
            this.tasks.fromJson(d);
          });
          x.next(this.tasks);
          x.complete();
        });
      });

    } else {
      x.next(this.tasks);
    }
    return x.asObservable();
  }

}
