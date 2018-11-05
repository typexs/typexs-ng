import {Routes} from '@angular/router';
import {InputDemoComponent} from './input-demo.component';
import {GroupDemoComponent} from './group-demo.component';
import {ContentDemoComponent} from './content-demo.component';
import {ContentViewChildDemoComponent} from './content-view-child-demo.component';
import {DemosComponent} from './demos.component';


export const APP_ROUTES: Routes = [
  {
    path: 'demo',
    component: DemosComponent,
    data: {label: 'Demo'},
    children: [
      {
        path: 'input',
        component: InputDemoComponent,
        data: {label: 'Input Demo', group: 'demo'},
      },
      {
        path: 'group',
        component: GroupDemoComponent,
        data: {label: 'Group Demo', group: 'demo'},
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

    ]
  },
  {
    path: '', redirectTo: 'demo', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'demo'
  }

];


