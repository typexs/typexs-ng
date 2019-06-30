import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendTasksService} from '../backend-tasks.service';
import {TaskLog} from '@typexs/base/entities/TaskLog';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'task-status',
  templateUrl: './task-status.component.html'
})
export class TaskStatusComponent implements OnInit {

  nodeId: string;

  runnerId: string;

  taskLog: TaskLog;

  log: any[];

  logError: string;

  t: NodeJS.Timeout;

  // logBoundry

  constructor(private tasksService: BackendTasksService,
              private route: ActivatedRoute,
              private datePipe: DatePipe) {
  }


  ngOnInit() {
    this.runnerId = this.route.snapshot.paramMap.get('runnerId');
    this.nodeId = this.route.snapshot.paramMap.get('nodeId');

    this.t = setInterval(() => {
      this.update();
    }, 1000);

  }

  buildLog() {
    if (this.log) {
      return this.log
        .map(e => this.datePipe.transform(new Date(parseInt(e.timestamp, 0)), 'yyyy-MM-dd HH:mm:ss.SSS') + ''
          + ' [' + e.level + '] ' + e.message).join('\n');
    }
    if (this.logError) {
      return this.logError;
    }
    return '';
  }


  update() {
    this.tasksService.taskStatus(this.runnerId, this.nodeId).subscribe(tasks => {
      if (tasks) {
        this.taskLog = tasks;
        if (this.taskLog.state && ['stopped', 'errored', 'request_error'].indexOf(this.taskLog.state) !== -1) {
          this.ngOnDestroy();
        }
      }
    }, error => {
      console.log(error);
      this.ngOnDestroy();
    });
    this.tasksService.taskLog(this.runnerId, this.nodeId).subscribe(x => {
      this.log = x;
    }, error => {
      console.log(error);
      this.logError = 'Log file not found.';
      this.ngOnDestroy();
    });
  }

  ngOnDestroy(): void {
    console.log('clear');
    clearInterval(this.t);
  }

}
