import * as _ from 'lodash';
import {Component} from '@angular/core';
import {TaskLog} from '@typexs/base/entities/TaskLog';
import {BackendTasksService} from '../backend-tasks.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';

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
  selector: 'txs-task-status-page',
  templateUrl: './task-status-page.component.html',
  // styleUrls: ['./task-status-page.component.scss']
})
export class TaskStatusPageComponent {

  nodeId: string;

  runnerId: string;

  taskLog: TaskLog;

  constructor(private tasksService: BackendTasksService,
              private route: ActivatedRoute,
              private datePipe: DatePipe) {
  }


  ngOnInit() {
    this.runnerId = this.route.snapshot.paramMap.get('runnerId');
    this.nodeId = this.route.snapshot.paramMap.get('nodeId');

    this.tasksService.taskStatus(this.runnerId).subscribe(tasks => {
      if (tasks) {
        // can have multiple entries from different nodes
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
