import {Component, OnInit} from '@angular/core';
import {TaskRef, Tasks} from '@typexs/base/browser';
import {BackendTasksService} from '../backend-tasks.service';
import {SystemInfoService} from '../../base/system-info.service';
import {Log} from '../../base/lib/log/Log';


@Component({
  selector: 'txs-tasks-metadata',
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
    this.tasksService.getTaskList(true).subscribe(x => {
      this._tasks = x;
      this.tasks = [];
      x.names(true).forEach(y => {
        const ref = x.get(y);
        this.tasks.push(ref);
      });
    }, error => Log.error(error));
  }

}
