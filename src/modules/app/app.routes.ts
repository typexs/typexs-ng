import {Routes} from '@angular/router';

import {GroupDemoComponent} from './group-demo.component';
import {ContentDemoComponent} from './content-demo.component';
import {ContentViewChildDemoComponent} from './content-view-child-demo.component';
import {DemosComponent} from './demos.component';
import {CheckboxMatrixDemoComponent} from './checkbox-matrix-demo/checkbox-matrix-demo.component';
import {MenuDemoComponent} from './menu-demo/menu-demo.component';
import {DummyComponent} from './dummy/dummy.component';
import {MenuAccessService} from './menu-demo/MenuAccessService';
import {PagerDemoComponent} from './pager-demo/pager-demo.component';
import {LogoutComponent} from './dummy/logout/logout.component';
import {ProfileComponent} from './dummy/profile/profile.component';
import {CTXT_ROUTE_USER_LOGOUT, CTXT_ROUTE_USER_PROFILE} from '../system/constants';
import {NotificationDemoComponent} from './components/demos/notification/notification-demo.component';
import {InputDemoComponent} from './components/demos/form-input/input-demo.component';


export const APP_ROUTES: Routes = [
  {
    path: 'demo',
    component: DemosComponent,
    data: {label: 'Demo'},
    children: [
      {
        path: 'input',
        component: InputDemoComponent,
        data: {label: 'Input', group: 'demo'},
      },
      {
        path: 'group',
        component: GroupDemoComponent,
        data: {label: 'Group Demo', group: 'demo'},
      },
      {
        path: 'checkbox-matrix',
        component: CheckboxMatrixDemoComponent,
        data: {label: 'Checkbox-Matrix', group: 'demo'},
      },
      {
        path: 'menu-demo',
        component: MenuDemoComponent,
        data: {label: 'Menus', group: 'demo'},
      },
      {
        path: 'content',
        component: ContentDemoComponent,
        data: {label: 'Content Demo', group: 'demo'},
      },
      {
        path: 'content-view-child',
        component: ContentViewChildDemoComponent,
        data: {label: 'Content View Child Demo', group: 'demo'},
      },
      {
        path: 'pager',
        component: PagerDemoComponent,
        data: {label: 'Pager', group: 'demo'},
      },

      {
        path: 'notifications',
        component: NotificationDemoComponent,
        data: {label: 'Notifications', group: 'demo'},
      },
    ]
  },
  {
    path: 'menu',
    component: DummyComponent,
    data: {label: 'Menu Base', group: 'menu'},
    children: [
      {
        path: 'menu-item-1',
        component: DummyComponent,
        data: {label: 'Menu Item 1', group: 'menu'},
      },
      {
        path: 'menu-item-2',
        component: DummyComponent,
        canActivate: [MenuAccessService],
        data: {label: 'Menu Item 2', group: 'menu'},

      },
      {
        path: 'menu-item-3',
        component: DummyComponent,
        canActivate: [MenuAccessService],
        data: {label: 'Menu Item 3', group: 'menu'},

      }

    ]
  },
  {
    path: 'user/logout',
    component: LogoutComponent,
    data: {label: 'Logout', skip: true, context: CTXT_ROUTE_USER_LOGOUT},
  }
  ,
  {
    path: 'user/profile',
    component: ProfileComponent,
    data: {label: 'Profile', skip: true, context: CTXT_ROUTE_USER_PROFILE},
  }
  ,
  {
    path: '', redirectTo: 'demo', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'demo'
  }

];


