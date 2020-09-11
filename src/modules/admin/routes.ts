import {Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SystemModulesComponent} from './system/modules/system-modules.component';
import {SystemRoutesComponent} from './system/routes/system-routes.component';
import {SystemStoragesComponent} from './system/storages/system-storages.component';
import {SystemConfigComponent} from './system/config/system-config.component';
import {NgRoutesComponent} from './ng/routes/ng-routes.component';
import {EntityTypesComponent} from './../entity/types/entity-types.component';
import {EntityModifyComponent} from './../entity/modify/entity-modify.component';
import {EntityQueryComponent} from './../entity/query/page/entity-query.component';
import {EntityViewComponent} from './../entity/view/entity-view.component';
import {EntityStructComponent} from './../entity/struct/entity-struct.component';
import {EntityDeleteComponent} from './../entity/delete/entity-delete.component';
import {AuthGuardService} from '../base/api/auth/auth-guard.service';
import {StorageBackendsComponent} from '../storage/backends/storage-backends.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TasksMetadataComponent} from '../tasks/metadata/tasks-metadata.component';
import {TasksExecutionComponent} from '../tasks/execution/tasks-execution.component';
import {SystemNodesComponent} from './system/nodes/system-nodes.component';
import {TasksLogComponent} from '../tasks/log/tasks-log.component';
import {TaskStatusPageComponent} from '../tasks/status/task-status-page.component';
import {STORAGE_ROUTES} from '../storage/routes';
import {StorageModule} from '../storage/module';
import {SettingsComponent} from './components/settings/settings.component';


export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuardService],
    data: {label: 'Admin', group: 'admin'},
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        data: {label: 'Dashboard', group: 'admin'}
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuardService],
        data: {label: 'Settings', group: 'admin'}
      },
      {
        path: 'system/nodes',
        component: SystemNodesComponent,
        canActivate: [AuthGuardService],
        data: {label: 'Nodes', group: 'admin'}
      },
      {
        path: 'system/modules',
        component: SystemModulesComponent,
        canActivate: [AuthGuardService],
        data: {label: 'Modules', group: 'admin'}
      },
      {
        path: 'system/routes',
        component: SystemRoutesComponent,
        data: {label: 'Routes', group: 'admin'},
        canActivate: [AuthGuardService],
      },
      {
        path: 'system/storages',
        component: SystemStoragesComponent,
        data: {label: 'Storages', group: 'admin'}
      },
      {
        path: 'system/config',
        component: SystemConfigComponent,
        data: {label: 'Config', group: 'admin'},
        canActivate: [AuthGuardService]
      },
      {
        path: 'ng/routes',
        component: NgRoutesComponent,
        data: {label: 'Routes', group: 'admin'},
        canActivate: [AuthGuardService]
      },
      {
        path: 'tasks/list',
        component: TasksMetadataComponent,
        data: {label: 'List', group: 'admin'},
        canActivate: [AuthGuardService]
      },
      {
        path: 'tasks/logs',
        component: TasksLogComponent,
        data: {label: 'Logs', group: 'admin'},
        canActivate: [AuthGuardService]
      },
      {
        path: 'tasks/run/:taskName',
        component: TasksExecutionComponent,
        data: {label: 'Execute', group: 'admin', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'tasks/status/:nodeId/:runnerId',
        component: TaskStatusPageComponent,
        data: {label: 'Status', group: 'admin', skip: true},
        canActivate: [AuthGuardService]
      },

      {
        path: 'storage/backends',
        component: StorageBackendsComponent,
        data: {label: 'Backend', group: 'admin'},
        canActivate: [AuthGuardService]
      },

    ]
  },


];


