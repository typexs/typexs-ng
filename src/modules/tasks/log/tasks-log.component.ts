import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {TaskRef, Tasks} from '@typexs/base/browser';
import {BackendTasksService} from '../backend-tasks.service';
import {SystemInfoService} from '../../system/system-info.service';
import {StorageService} from '../../storage/storage.service';
import {TaskLog} from '@typexs/base/entities/TaskLog';
import {IGridOptions} from '../../system/datatable/IGridOptions';
import {IGridColumn} from '../../system/datatable/IGridColumn';
import {C_URL_HANDLER, C_URL_TITLE, CC_GRID_CELL_ROUTER_LINK} from '../../system/constants';

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

  options: IGridOptions = {
    enablePager: true,
    limit: 25,
    pagerId: 'page',
    columnsPostProcess: this.columnsPostProcess.bind(this)
  };


  constructor(private tasksService: BackendTasksService,
              private infoService: SystemInfoService,
              private storageService: StorageService) {
  }


  columnsPostProcess(columns: IGridColumn[]) {
    const column = columns.find(x => x.field === 'tasksId');
    column.cellValueRenderer = CC_GRID_CELL_ROUTER_LINK;
    _.set((<any>column), C_URL_HANDLER, (v: any, row: any) => {
      return [this.tasksService.getNgUrlPrefix(), 'status', row.respId, row.tasksId];
    });
    _.set((<any>column), C_URL_TITLE, (v: any, row: any) => {
      return v;
    });
  }


  ngOnInit() {
    this.storageService.isReady(this.onInit.bind(this));
  }


  onInit() {
    this.storageService.query(TaskLog.name);
  }
}
