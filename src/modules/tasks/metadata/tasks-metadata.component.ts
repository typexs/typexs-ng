import {Component, OnInit} from '@angular/core';
import {TaskRef, Tasks} from '@typexs/base/browser';
import {BackendTasksService} from '../backend-tasks.service';
import {SystemInfoService} from '../../system/system-info.service';


@Component({
  selector: 'tasks-metadata',
  templateUrl: './tasks-metadata.component.html'
})
export class TasksMetadataComponent implements OnInit {

  private _tasks: Tasks;

  tasks: TaskRef[];


  constructor(private tasksService: BackendTasksService, private infoService: SystemInfoService) {
  }

  baseUrl() {
    return this.tasksService.getNgUrlPrefix();
  }

  hasWorkerNodes() {
    return this.tasksService.hasWorkerNodes();
  }

  getWorkerNodes() {
    return this.tasksService.getWorkerNodes();
  }


  ngOnInit() {
    this.tasksService.taskList(true).subscribe(x => {
      this._tasks = x;
      this.tasks = [];
      x.names(true).forEach(y => {
        const ref = x.get(y);
        this.tasks.push(ref);
      });
    });
  }

}
