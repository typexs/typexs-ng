import {Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SystemModulesComponent} from './system/modules/system-modules.component';
import {SystemRoutesComponent} from './system/routes/system-routes.component';
import {SystemStoragesComponent} from './system/storages/system-storages.component';
import {SystemConfigComponent} from './system/config/system-config.component';
import {NgRoutesComponent} from './ng/routes/ng-routes.component';
import {EntityTypesComponent} from './../entity/types/entity-types.component';
import {EntityModifyComponent} from './../entity/modify/entity-modify.component';
import {EntityQueryComponent} from './../entity/query/entity-query.component';
import {EntityViewComponent} from './../entity/view/entity-view.component';
import {EntityStructComponent} from './../entity/struct/entity-struct.component';
import {EntityDeleteComponent} from './../entity/delete/entity-delete.component';
import {AuthGuardService} from '../system/api/auth/auth-guard.service';
import {StorageTypesComponent} from '../storage/types/storage-types.component';
import {StorageStructComponent} from '../storage/struct/storage-struct.component';
import {StorageModifyComponent} from '../storage/modify/storage-modify.component';
import {StorageViewComponent} from '../storage/view/storage-view.component';
import {StorageDeleteComponent} from '../storage/delete/storage-delete.component';
import {StorageQueryComponent} from '../storage/query/storage-query.component';
import {StorageBackendsComponent} from '../storage/backends/storage-backends.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TasksMetadataComponent} from '../tasks/metadata/tasks-metadata.component';
import {TasksExecutionComponent} from '../tasks/execution/tasks-execution.component';
import {TaskStatusComponent} from '../tasks/status/task-status.component';


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
        path: 'tasks/run/:taskName',
        component: TasksExecutionComponent,
        data: {label: 'Execute', group: 'admin', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'tasks/status/:nodeId/:runnerId',
        component: TaskStatusComponent,
        data: {label: 'Status', group: 'admin', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'entity/types',
        component: EntityTypesComponent,
        data: {label: 'Types', group: 'admin'},
        canActivate: [AuthGuardService]
      },

      {
        path: 'entity/:machineName/create',
        component: EntityModifyComponent,
        data: {label: 'Create entity', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'entity/:machineName/view/:id',
        component: EntityViewComponent,
        data: {label: 'View entity', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'entity/:machineName/edit/:id',
        component: EntityModifyComponent,
        data: {label: 'Edit entity', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'entity/:machineName/delete/:id',
        component: EntityDeleteComponent,
        data: {label: 'Delete entity', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'entity/:machineName/query',
        component: EntityQueryComponent,
        data: {label: 'List entities', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'entity/:machineName/structure',
        component: EntityStructComponent,
        data: {label: 'Entity type structure', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'storage/types',
        component: StorageTypesComponent,
        data: {label: 'Types', group: 'admin'},
        canActivate: [AuthGuardService]
      },
      {
        path: 'storage/:machineName/structure',
        component: StorageStructComponent,
        data: {label: 'Entity type structure', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'storage/:machineName/create',
        component: StorageModifyComponent,
        data: {label: 'Create entity', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'storage/:machineName/view/:id',
        component: StorageViewComponent,
        data: {label: 'View entity', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'storage/:machineName/edit/:id',
        component: StorageModifyComponent,
        data: {label: 'Edit entity', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'storage/:machineName/delete/:id',
        component: StorageDeleteComponent,
        data: {label: 'Delete entity', skip: true},
        canActivate: [AuthGuardService]
      },
      {
        path: 'storage/:machineName/query',
        component: StorageQueryComponent,
        data: {label: 'List entities', skip: true},
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


