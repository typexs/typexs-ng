import {Component, OnInit} from '@angular/core';
import {TaskRef, Tasks} from '@typexs/base/browser';
import {BackendTasksService} from '../backend-tasks.service';
import {SystemInfoService} from '../../system/system-info.service';
import {StorageService} from '../../storage/storage.service';
import {TaskLog} from '@typexs/base/entities/TaskLog';

/**
 * Show tasks list which should be filtered for running tasks, runned task
 *
 */
@Component({
  selector: 'tasks-log',
  templateUrl: './tasks-log.component.html'
})
export class TasksLogComponent implements OnInit {

  private _tasks: Tasks;

  tasks: TaskRef[];

  entries: TaskLog[] = [];

  ready = false;


  constructor(private tasksService: BackendTasksService,
              private infoService: SystemInfoService,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.storageService.isReady(this.onInit.bind(this));
  }


  onInit() {
    this.storageService.query(TaskLog.name);
  }
}
