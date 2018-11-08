import {Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SystemModulesComponent} from './system/modules/system-modules.component';
import {SystemRoutesComponent} from './system/routes/system-routes.component';
import {SystemStoragesComponent} from './system/storages/system-storages.component';
import {SystemConfigComponent} from './system/config/system-config.component';
import {NgRoutesComponent} from './ng/routes/ng-routes.component';
import {EntityTypesComponent} from './entity/entity-types.component';
import {EntityModifyComponent} from './entity/entity-modify.component';
import {EntityQueryComponent} from './entity/entity-query.component';
import {EntityViewComponent} from './entity/entity-view.component';
import {EntityStructComponent} from './entity/struct/entity-struct.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin', component: AdminComponent, data: {label: 'Admin'},
    children: [
      {
        path: 'system/modules', component: SystemModulesComponent, data: {label: 'Modules', group: 'admin'}
      },
      {
        path: 'system/routes', component: SystemRoutesComponent, data: {label: 'Routes', group: 'admin'}
      },
      {
        path: 'system/storages', component: SystemStoragesComponent, data: {label: 'Storages', group: 'admin'}
      },
      {
        path: 'system/config', component: SystemConfigComponent, data: {label: 'Config', group: 'admin'}
      },
      {
        path: 'ng/routes', component: NgRoutesComponent, data: {label: 'Routes', group: 'admin'}
      },

      {
        path: 'entity/types', component: EntityTypesComponent, data: {label: 'Types', group: 'admin'}
      },

      {
        path: 'entity/:machineName/create', component: EntityModifyComponent, data: {label: 'Create entity', skip: true}
      },
      {
        path: 'entity/:machineName/view/:id', component: EntityViewComponent, data: {label: 'View entity', skip: true}
      },
      {
        path: 'entity/:machineName/edit/:id', component: EntityModifyComponent, data: {label: 'Edit entity', skip: true}
      },
      {
        path: 'entity/:machineName/query', component: EntityQueryComponent, data: {label: 'List entities', skip: true}
      },
      {
        path: 'entity/:machineName/structure', component: EntityStructComponent, data: {
          label: 'Entity type structure', skip: true,
          runGuardsAndResolvers: 'always'
        }
      }

    ]
  },


];


