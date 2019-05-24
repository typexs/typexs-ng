import {Component, OnInit} from '@angular/core';

import {TaskRef} from '@typexs/base/browser';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendTasksService} from '../backend-tasks.service';
import {IPropertyRef} from 'commons-schema-api';
import {TaskEvent} from '@typexs/base/libs/tasks/worker/TaskEvent';
import {TaskLog} from '@typexs/base/entities/TaskLog';
import {StorageService} from '../../storage/storage.service';


@Component({
  selector: 'tasks-execution',
  templateUrl: './tasks-execution.component.html'
})
export class TasksExecutionComponent implements OnInit {

  waiting = false;

  done = false;

  taskName: string;

  taskRef: TaskRef;

  error: Error;

  nodeIds: string[] = [];

  properties: IPropertyRef[] = [];

  parameters: any = {};

  event: TaskEvent;

  logs: TaskLog[] = [];


  constructor(private tasksService: BackendTasksService,
              private route: ActivatedRoute,
              private router: Router,
              private storageService: StorageService) {
  }


  ngOnInit() {
    this.tasksService.taskList(true).subscribe(tasks => {
      this.taskName = this.route.snapshot.paramMap.get('taskName');
      this.taskRef = tasks.get(this.taskName);
      this.taskRef.getPropertyRefs().forEach(p => {
        if (p.descriptor.type === 'incoming') {
          this.parameters[p.machineName] = null;
          this.properties.push(p);
        }
      });
    });
  }

  execute() {
    console.log('execute', this.taskName, this.parameters, this.nodeIds);
    this.waiting = true;
    this.tasksService.execute(this.taskName, this.parameters, this.nodeIds).subscribe(
      event => {
        this.waiting = false;
        this.event = event;
        if (event.errors && event.errors.length > 0) {
          return;
        } else {
          this.done = true;
          // this.router.navigate([this.tasksService.getNgUrlPrefix(), 'status', event.id]);
        }
      },
      error => {
        this.waiting = true;
        this.error = error;
      }
    );
  }

  reset() {
    this.event = null;
    this.done = false;
    this.waiting = false;
    this.parameters = {};
  }

}
