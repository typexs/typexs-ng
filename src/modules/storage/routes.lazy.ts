import {StorageTypesComponent} from './types/storage-types.component';
import {AuthGuardService} from '../base/api/auth/auth-guard.service';
import {StorageStructComponent} from './struct/storage-struct.component';
import {StorageModifyComponent} from './modify/storage-modify.component';
import {StorageViewComponent} from './view/storage-view.component';
import {StorageDeleteComponent} from './delete/storage-delete.component';
import {StorageQueryComponent} from './query/page/storage-query.component';
import {StorageAggregateComponent} from './aggregate/page/storage-aggregate.component';
import {Routes} from '@angular/router';
import {
  PERMISSION_ALLOW_ACCESS_STORAGE_ENTITY,
  PERMISSION_ALLOW_ACCESS_STORAGE_ENTITY_PATTERN,
  PERMISSION_ALLOW_ACCESS_STORAGE_METADATA,
  PERMISSION_ALLOW_DELETE_STORAGE_ENTITY,
  PERMISSION_ALLOW_DELETE_STORAGE_ENTITY_PATTERN,
  PERMISSION_ALLOW_SAVE_STORAGE_ENTITY,
  PERMISSION_ALLOW_SAVE_STORAGE_ENTITY_PATTERN,
  PERMISSION_ALLOW_STORAGE_ENTITY_VIEW
} from '@typexs/server';

export const LAZY_STORAGE_ROUTES: Routes = [
  {
    path: 'types',
    component: StorageTypesComponent,
    data: {
      label: 'Types',
      permissions: [
        PERMISSION_ALLOW_ACCESS_STORAGE_METADATA
      ]
    },
    canActivate: [AuthGuardService]
  },
  {
    path: ':name/structure',
    component: StorageStructComponent,
    data: {
      label: 'Entity type structure',
      skip: true,
      permissions: [
        PERMISSION_ALLOW_ACCESS_STORAGE_METADATA
      ]

    },
    canActivate: [AuthGuardService]
  },
  {
    path: ':name/create',
    component: StorageModifyComponent,
    data: {
      label: 'Create entity',
      skip: true,
      permissions: [
        PERMISSION_ALLOW_SAVE_STORAGE_ENTITY,
        PERMISSION_ALLOW_SAVE_STORAGE_ENTITY_PATTERN
      ]
    },
    canActivate: [AuthGuardService]
  },
  {
    path: ':name/view/:id',
    component: StorageViewComponent,
    data: {
      label: 'View entity',
      skip: true,
      permissions: [
        PERMISSION_ALLOW_STORAGE_ENTITY_VIEW
      ]
    },
    canActivate: [AuthGuardService]
  },
  {
    path: ':name/edit/:id',
    component: StorageModifyComponent,
    data: {
      label: 'Edit entity', skip: true,
      permissions: [
        PERMISSION_ALLOW_SAVE_STORAGE_ENTITY,
        PERMISSION_ALLOW_SAVE_STORAGE_ENTITY_PATTERN
      ]
    },
    canActivate: [AuthGuardService]
  },
  {
    path: ':name/delete/:id',
    component: StorageDeleteComponent,
    data: {
      label: 'Delete entity', skip: true,
      permissions: [
        PERMISSION_ALLOW_DELETE_STORAGE_ENTITY,
        PERMISSION_ALLOW_DELETE_STORAGE_ENTITY_PATTERN
      ]
    },
    canActivate: [AuthGuardService]
  },
  {
    path: ':name/query',
    component: StorageQueryComponent,
    data: {
      label: 'List entities', skip: true,
      permissions: [
        PERMISSION_ALLOW_ACCESS_STORAGE_ENTITY,
        PERMISSION_ALLOW_ACCESS_STORAGE_ENTITY_PATTERN
      ]
    },
    canActivate: [AuthGuardService]
  },
  {
    path: ':name/aggregate',
    component: StorageAggregateComponent,
    data: {
      label: 'List entities', skip: true,
      permissions: [
        PERMISSION_ALLOW_ACCESS_STORAGE_ENTITY,
        PERMISSION_ALLOW_ACCESS_STORAGE_ENTITY_PATTERN
      ]
    },
    canActivate: [AuthGuardService]
  }

];
