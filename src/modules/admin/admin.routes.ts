import {Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SystemModulesComponent} from './system/modules/system-modules.component';
import {SystemRoutesComponent} from './system/routes/system-routes.component';
import {SystemStoragesComponent} from './system/storages/system-storages.component';

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
      }

    ]
  },


];


