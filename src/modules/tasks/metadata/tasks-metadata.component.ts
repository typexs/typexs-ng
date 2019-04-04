import {Component, OnInit} from '@angular/core';
import {TaskRef, Tasks} from '@typexs/base/browser';
import {BackendTasksService} from '../backend-tasks.service';


@Component({
  selector: 'tasks-metadata',
  templateUrl: './tasks-metadata.component.html'
})
export class TasksMetadataComponent implements OnInit {

  private _tasks: Tasks;

  tasks: TaskRef[];

  constructor(private tasksService: BackendTasksService) {
  }

  baseUrl(){
    return this.tasksService.getNgUrlPrefix();
  }


  ngOnInit() {
    this.tasksService.taskList(true).subscribe(x => {
      this._tasks = x;
      this.tasks = [];
      x.names(true).forEach(y => {
        let ref = x.get(y);

        this.tasks.push(ref);
      });
    });
  }

}
