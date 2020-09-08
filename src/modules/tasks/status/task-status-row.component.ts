import * as _ from 'lodash';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BackendTasksService} from '../backend-tasks.service';
import {TaskLog} from '@typexs/base/entities/TaskLog';
import {Observable, Subscription, timer} from 'rxjs';
import {Log} from '../../base/lib/log/Log';

@Component({
  selector: 'txs-task-status-row',
  templateUrl: './task-status-row.component.html'
})
export class TaskStatusRowComponent implements OnInit, OnDestroy {

  @Input()
  runnerId: string;

  @Input()
  nodeId: string;

  taskLog: TaskLog;

  timer: Observable<number>;

  subscription: Subscription = new Subscription();


  constructor(private tasksService: BackendTasksService) {
  }

  baseUrl() {
    return this.tasksService.getNgUrlPrefix();
  }

  state() {
    if (this.taskLog) {
      if (this.taskLog.running) {
        return 'warning';
      } else {
        if (this.taskLog.hasError) {
          return 'error';
        }
        return 'success';
      }
    }
    return 'info';
  }

  ngOnInit() {
    Log.debug('init');
    this.timer = timer(0, 1000);
    this.subscription.add(this.timer.subscribe(x => this.update()));
  }

  update() {
    Log.debug('update', this.runnerId, this.nodeId);
    this.tasksService.taskStatus(this.runnerId, {targetIds: [this.nodeId]}).subscribe(tasks => {
      Log.debug(tasks);
      if (tasks) {
        if (_.isArray(tasks)) {
          this.taskLog = tasks.shift();
        } else {
          this.taskLog = tasks;
        }

        if (this.taskLog.state && ['stopped', 'errored', 'request_error'].indexOf(this.taskLog.state) === -1) {
          this.ngOnDestroy();
        }
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
