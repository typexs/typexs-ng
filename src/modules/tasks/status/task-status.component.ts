import * as _ from 'lodash';
import {Component, Input, OnInit} from '@angular/core';
import {BackendTasksService} from '../backend-tasks.service';
import {TaskLog} from '@typexs/base/entities/TaskLog';

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


  position = 0;

  fetchSize = 1;

  contentContainer = 'log';

  constructor(private tasksService: BackendTasksService) {
  }


  ngOnInit() {
    if (this.taskLog) {
      this.runnerId = this.taskLog.tasksId;
      this.nodeId = this.taskLog.respId;
    }
  }


  update() {
    this.tasksService.taskStatus(this.runnerId, {targetIds: [this.nodeId]}).subscribe(tasks => {
      if (tasks) {
        if (_.isArray(tasks)) {
          this.taskLog = tasks.shift();
        } else {
          this.taskLog = tasks;
        }
      }
    }, error => {
      console.log(error);
    });

  }



}
