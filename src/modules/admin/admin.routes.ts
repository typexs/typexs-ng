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

import {AUTH_SERVICE_GUARD_PROVIDER} from '../system/api/auth/IAuthGuardProvider';


export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin', component: AdminComponent, data: {label: 'Admin'},
    children: [
      {
        path: 'system/modules',
        component: SystemModulesComponent,
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER],
        data: {label: 'Modules', group: 'admin'}
      },
      {
        path: 'system/routes',
        component: SystemRoutesComponent,
        data: {label: 'Routes', group: 'admin'},
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER],
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
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER]
      },
      {
        path: 'ng/routes',
        component: NgRoutesComponent,
        data: {label: 'Routes', group: 'admin'},
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER]
      },
      {
        path: 'entity/types',
        component: EntityTypesComponent,
        data: {label: 'Types', group: 'admin'},
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER]
      },
      {
        path: 'entity/:machineName/create',
        component: EntityModifyComponent,
        data: {label: 'Create entity', skip: true},
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER]
      },
      {
        path: 'entity/:machineName/view/:id',
        component: EntityViewComponent,
        data: {label: 'View entity', skip: true},
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER]
      },
      {
        path: 'entity/:machineName/edit/:id',
        component: EntityModifyComponent,
        data: {label: 'Edit entity', skip: true},
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER]
      },
      {
        path: 'entity/:machineName/delete/:id',
        component: EntityDeleteComponent,
        data: {label: 'Delete entity', skip: true},
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER]
      },
      {
        path: 'entity/:machineName/query',
        component: EntityQueryComponent,
        data: {label: 'List entities', skip: true},
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER]
      },
      {
        path: 'entity/:machineName/structure',
        component: EntityStructComponent,
        data: {label: 'Entity type structure', skip: true},
        canActivate: [AUTH_SERVICE_GUARD_PROVIDER]
      }

    ]
  },


];


