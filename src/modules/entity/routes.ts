import {Routes} from '@angular/router';
import {EntityTypesComponent} from './types/entity-types.component';
import {AuthGuardService} from '../base/api/auth/auth-guard.service';
import {EntityModifyComponent} from './modify/entity-modify.component';
import {EntityViewComponent} from './view/entity-view.component';
import {EntityDeleteComponent} from './delete/entity-delete.component';
import {EntityQueryComponent} from './query/page/entity-query.component';
import {EntityStructComponent} from './struct/entity-struct.component';

export const ENTITY_ROUTES: Routes = [
  {
    path: 'entity/types',
    component: EntityTypesComponent,
    data: {
      label: 'Types'
    },
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

];
