import {Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SystemModulesComponent} from './system/modules/system-modules.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin', component: AdminComponent, data: {label: 'Admin'},
    children: [
      {
        path: 'system/modules', component: SystemModulesComponent, data: {label: 'Modules', group: 'admin'}
      }
    ]
  },


];


