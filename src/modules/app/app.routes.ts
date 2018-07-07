import {Routes} from '@angular/router';
import {InputDemoComponent} from './input-demo.component';
import {GroupDemoComponent} from './group-demo.component';


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
  }

];


