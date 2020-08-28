import * as _ from 'lodash';
import {Component, Input, OnInit} from '@angular/core';
import {BackendTasksService} from '../backend-tasks.service';
import {TaskLog} from '@typexs/base/entities/TaskLog';
import {DatePipe} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';

/**
 * Show status of a task (running or finished)
 *
 * - show base task data
 * - show results, incomigs, outgoing
 * - show log if present as tail or scrollable content
 * - show error or running status
 *
 * Actions:
 * - abort running task!
 * - rerun with same configuration (incomming)
 */
@Component({
  selector: 'txs-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {

  @Input()
  nodeId: string;

  @Input()
  runnerId: string;

  @Input()
  taskLog: TaskLog;

  log: string;

  logError: string;

  t: NodeJS.Timeout;

  logSub: Subscription;

  position = 0;

  fetchSize = 500;

  contentContainer = 'log';

  constructor(private tasksService: BackendTasksService,
              //            private route: ActivatedRoute,
              private datePipe: DatePipe) {
  }


  ngOnInit() {
    /*
    this.runnerId = this.route.snapshot.paramMap.get('runnerId');
    this.nodeId = this.route.snapshot.paramMap.get('nodeId');
*/
    // console.log('init', this.taskLog);
    if (this.taskLog) {
      this.runnerId = this.taskLog.tasksId;
      this.nodeId = this.taskLog.respId;
    }

    this.t = setInterval(() => {
      this.update();
    }, 1000);

  }


  buildLog(log: any[]): string[] {
    return log
      .map(e => this.datePipe.transform(new Date(parseInt(e.timestamp, 0)), 'yyyy-MM-dd HH:mm:ss.SSS') + ''
        + ' [' + e.level + '] ' + e.message);
  }


  update() {
    this.tasksService.taskStatus(this.runnerId).subscribe(tasks => {
      if (tasks) {
        if (_.isArray(tasks)) {
          this.taskLog = tasks.shift();
        } else {
          this.taskLog = tasks;
        }

        if (this.taskLog.state && ['stopped', 'errored', 'request_error'].indexOf(this.taskLog.state) !== -1) {
          this.ngOnDestroy();
        }
      }
    }, error => {
      console.log(error);
      this.ngOnDestroy();
    });
    this.tasksService.taskLog(this.runnerId, this.nodeId).subscribe(x => {
      if (x) {
        this.log = this.buildLog(x).join('\n');
      }
    }, error => {
      console.log(error);
      this.logError = 'Log file not found.';
      this.ngOnDestroy();
    });
  }


  getLog(from: number = 1, offset: number = 50) {
    this.tasksService.taskLog(this.runnerId, this.nodeId, from, offset).subscribe(x => {
        if (x) {
          this.log += this.buildLog(x).join('\n') + '\n';
          this.position += x.length;
          this.getLog(this.position, offset);
        }
      },
      error => {
        console.log(error);
      });
  }


  loadLog() {
    this.position = 0;
    this.log = '';
    this.getLog(this.position, this.fetchSize);
  }


  ngOnDestroy(): void {
    clearInterval(this.t);
  }

}
