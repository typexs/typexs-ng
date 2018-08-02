import {Routes} from '@angular/router';
import {InputDemoComponent} from './input-demo.component';
import {GroupDemoComponent} from './group-demo.component';
import {ContentDemoComponent} from './content-demo.component';
import {ContentViewChildDemoComponent} from './content-view-child-demo.component';


export const APP_ROUTES: Routes = [
  {
    path: 'inputDemos',
    component: InputDemoComponent,
    data: {label: 'Input Demo'}
  },
  {
    path: 'groupDemos',
    component: GroupDemoComponent,
    data: {label: 'Group Demo'}
  },
  {
    path: 'contentDemos',
    component: ContentDemoComponent,
    data: {label: 'Content Demo'}
  },
  {
    path: 'content-view-child-demo',
    component: ContentViewChildDemoComponent,
    data: {label: 'Content View Child Demo'}
  }

];


