import {NgModule} from '@angular/core';
import {FormsModule} from '../forms/module';
import {BrowserModule} from '@angular/platform-browser';
import {BaseModule} from '../base/module';
import {RouterModule} from '@angular/router';
import {FormsModule as NgFormsModule} from '@angular/forms';
import {BackendTasksService} from './backend-tasks.service';
import {TasksMetadataComponent} from './metadata/tasks-metadata.component';
import {TasksExecutionComponent} from './execution/tasks-execution.component';
import {TaskStatusComponent} from './status/task-status.component';
import {TaskStatusRowComponent} from './status/task-status-row.component';
import {StorageModule} from '../storage/storage.module';
import {DatePipe} from '@angular/common';
import {TasksLogComponent} from './log/tasks-log.component';
import {TaskStatusPageComponent} from './status/task-status-page.component';

const PROVIDERS = [
  BackendTasksService,
  DatePipe
];

@NgModule({
  declarations: [
    TasksMetadataComponent,
    TasksExecutionComponent,
    TaskStatusComponent,
    TaskStatusPageComponent,
    TasksLogComponent,
    TaskStatusRowComponent,
  ],
  imports: [
    BaseModule,
    BrowserModule,
    RouterModule,
    NgFormsModule,
    FormsModule,
    StorageModule
  ],
  exports: [
    TasksMetadataComponent,
    TasksExecutionComponent,
    TaskStatusComponent,
    TasksLogComponent,
    TaskStatusRowComponent,
  ],
  providers: PROVIDERS
})
export class TasksModule {

  static forRoot() {
    return {
      ngModule: TasksModule,
      providers: PROVIDERS
    };
  }

}