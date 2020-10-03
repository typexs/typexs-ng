import {NgModule, Provider} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SystemModulesComponent} from './system/modules/system-modules.component';
import {NavigatorModule} from '../navigator/module';
import {ADMIN_ROUTES} from './routes';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {SystemRoutesComponent} from './system/routes/system-routes.component';
import {SystemStoragesComponent} from './system/storages/system-storages.component';

import {SystemConfigComponent} from './system/config/system-config.component';
import {NgRoutesComponent} from './ng/routes/ng-routes.component';
import {FormsModule} from '../forms/module';
import {BaseModule} from '../base/module';
// import {EntityModule} from '../entity/module';
import {NavigatorService} from '../navigator/navigator.service';
import {BaseAdminThemeModule} from '../base_admin_theme/base_admin_theme.module';
// import {EntityService} from '../entity/entity.service';
// import {StorageService} from '../storage/storage.service';
// import {StorageModule} from '../storage/module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TasksModule} from '../tasks/module';
import {BackendTasksService} from '../tasks/backend-tasks.service';
import {SystemNodesComponent} from './system/nodes/system-nodes.component';
import {SystemNodeInfoComponent} from './system/nodes/node-info/system-node-info.component';
import {SettingsComponent} from './components/settings/settings.component';
import {AppService} from '../base/app.service';

const PROVIDERS: Provider[] = [];


@NgModule({
  declarations: [
    AdminComponent,
    SystemModulesComponent,
    SystemRoutesComponent,
    SystemStoragesComponent,
    SystemConfigComponent,
    SystemNodesComponent,
    NgRoutesComponent,
    DashboardComponent,
    SystemNodeInfoComponent,
    SettingsComponent
  ],
  imports: [
    BaseAdminThemeModule,
    BaseModule.forRoot(),
    NavigatorModule.forRoot(),
    RouterModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forChild(ADMIN_ROUTES),
    FormsModule.forRoot(),
    // EntityModule,
    TasksModule,
    // StorageModule,
    FormsModule
  ],
  exports: [
    AdminComponent
  ],
  providers: PROVIDERS
})
export class AdminModule {


  static forRoot() {
    return {
      ngModule: AdminModule,
      providers: PROVIDERS
    };
  }

  constructor(private navigator: NavigatorService,
              private appService: AppService,
              private taskService: BackendTasksService) {
    // Startup stuff should be done once!

    taskService.setNgUrlPrefix('/admin/tasks');
    this.navigator.addGroupEntry('admin/system/.*', {label: 'System', group: 'admin'});
    this.navigator.addGroupEntry('admin/ng/.*', {label: 'Angular', group: 'admin'});
    this.navigator.addGroupEntry('admin/tasks/.*', {label: 'Tasks', group: 'admin'});
  }


}
