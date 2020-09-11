import {StorageTypesComponent} from './types/storage-types.component';
import {AuthGuardService} from '../base/api/auth/auth-guard.service';
import {StorageStructComponent} from './struct/storage-struct.component';
import {StorageModifyComponent} from './modify/storage-modify.component';
import {StorageViewComponent} from './view/storage-view.component';
import {StorageDeleteComponent} from './delete/storage-delete.component';
import {StorageQueryComponent} from './query/page/storage-query.component';
import {StorageAggregateComponent} from './aggregate/page/storage-aggregate.component';
import {PERMISSION_ALLOW_ACCESS_ENTITY_METADATA} from '@typexs/schema/browser';
import {Routes} from '@angular/router';

export const STORAGE_ROUTES: Routes = [
  {
    path: 'storage/types',
    component: StorageTypesComponent,
    data: {
      label: 'Types',
      permissions: [
        PERMISSION_ALLOW_ACCESS_ENTITY_METADATA
      ]
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'storage/:machineName/structure',
    component: StorageStructComponent,
    data: {
      label: 'Entity type structure',
      skip: true
    },
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
    path: 'storage/:machineName/aggregate',
    component: StorageAggregateComponent,
    data: {label: 'List entities', skip: true},
    canActivate: [AuthGuardService]
  },

];
