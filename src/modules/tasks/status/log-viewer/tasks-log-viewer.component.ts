import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {JsonUtils} from 'commons-base/libs/utils/JsonUtils';
import {DatePipe} from '@angular/common';
import {BackendTasksService} from '../../backend-tasks.service';
import {TaskLog} from '@typexs/base/entities/TaskLog';
import {Observable, Subscriber, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

/**
 * Show tasks list which should be filtered for running tasks, runned task
 *
 */
@Component({
  selector: 'txs-task-log-viewer',
  templateUrl: './tasks-log-viewer.component.html',
  styleUrls: ['./tasks-log-viewer.component.scss']
})
export class TasksLogViewerComponent implements OnInit {

  @Input()
  nodeId: string;

  @Input()
  runnerId: string;

  @Input()
  taskLog: TaskLog;

  count: number = 0;

  position: number = 0;

  maxlines: number = 0;

  fetchSize = 100;

  update: boolean;

  log: string = '';

  logError: string;

  // t: NodeJS.Timeout;

  sub: Subscription = null;


  constructor(
    private tasksService: BackendTasksService,
    private datePipe: DatePipe) {
  }


  ngOnInit() {
    // console.log('init', this.taskLog);
    if (this.taskLog) {
      this.runnerId = this.taskLog.tasksId;
      this.nodeId = this.taskLog.respId;
    }

    this.tasksService.taskLog(this.runnerId, this.nodeId).subscribe(x => {
      if (x) {
        this.append(x);
      }
    }, error => {
      this.logError = 'Log file not found. (' + error.message + ')';
      this.finishUpdate();
    });
    // this.t = setInterval(() => {
    //   this.update();
    // }, 1000);

  }


  buildLog(log: any[]): string[] {

    const firstEntry = _.first(log);
    if (firstEntry) {
      let logs = firstEntry.split('\n').filter((x: any) => !_.isEmpty(x));
      logs = logs.map((x: any) => JsonUtils.parse(x));
      return logs
        .map((e: any) =>
          this.datePipe
            .transform(
              new Date(parseInt(e.timestamp, 0)), 'yyyy-MM-dd HH:mm:ss.SSS') + ''
          + ' [' + e.level + '] ' + e.message);
    }
    return [];
  }


  getLog(from: number = 1, offset: number = 50) {
    this.tasksService.taskLog(this.runnerId, this.nodeId, from, offset).subscribe(x => {
        if (x) {
          this.append(x);
        }
      },
      error => {
        console.log(error);
      });
  }


  append(x: any) {
    if (_.isUndefined(this.position) || !this.position) {
      this.position = 1;
    }
    if (_.isUndefined(this.log) || !this.log) {
      this.log = '';
    }
    const buildLines = this.buildLog(x);
    this.log += buildLines.join('\n') + '\n';
    this.maxlines += buildLines.length;
    return buildLines.length;
  }


  loadLog() {
    this.count = 0;
    this.position = 0;
    this.maxlines = 0;
    this.log = '';

    let prevLines = 0;
    let _subscriber: Subscriber<any> = null;
    this.sub = new Observable(subscriber => {
      _subscriber = subscriber;
      subscriber.next(this.count);
    })
      .pipe(
        switchMap((x: number) => {
          const from = x * this.fetchSize;
          return this.tasksService.taskLog(this.runnerId, this.nodeId, from, this.fetchSize);
        })
      )
      .subscribe(x => {
          prevLines = this.maxlines;
          const appended = this.append(x);

          if (appended > 0) {
            this.count++;
            _subscriber.next(this.count);
          } else {
            _subscriber.complete();
          }
        },
        error => {
          _subscriber.error(error);
        })
    ;
  }


  finishUpdate() {
    // clearInterval(this.t);
  }


  ngOnDestroy(): void {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
    this.finishUpdate();
  }

}
