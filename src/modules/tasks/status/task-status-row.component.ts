import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BackendTasksService} from '../backend-tasks.service';
import {TaskLog} from '@typexs/base/entities/TaskLog';


@Component({
  selector: 'task-status-row',
  templateUrl: './task-status-row.component.html'
})
export class TaskStatusRowComponent implements OnInit, OnDestroy {

  @Input()
  runnerId: string;

  @Input()
  nodeId: string;

  taskLog: TaskLog;

  timer: NodeJS.Timer;


  constructor(private tasksService: BackendTasksService) {
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
    this.update();
    this.timer = setInterval(() => {
      this.update();
    }, 1000);
  }

  update() {
    this.tasksService.taskStatus(this.runnerId, this.nodeId).subscribe(tasks => {
      if (tasks) {
        this.taskLog = tasks;
        if (this.taskLog.state && ['stopped', 'errored', 'request_error'].indexOf(this.taskLog.state) == -1) {
          this.ngOnDestroy();
        }
      }
    });

  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }


}
