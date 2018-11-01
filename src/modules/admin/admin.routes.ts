import {Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SystemModulesComponent} from './system/modules/system-modules.component';
import {SystemRoutesComponent} from './system/routes/system-routes.component';
import {SystemStoragesComponent} from './system/storages/system-storages.component';
import {SystemConfigComponent} from './system/config/system-config.component';
import {NgRoutesComponent} from './ng/routes/ng-routes.component';
import {EntityTypesComponent} from './entity/entity-types.component';
import {EntityCreateComponent} from './entity/entity-create.component';

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
        path: 'entity/:machineName/create', component: EntityCreateComponent, data: {label: 'Create entity',  skip:true}
      }


    ]
  },


];


