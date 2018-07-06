import {Routes} from '@angular/router';
import {InputDemoComponent} from './input-demo.component';


export const APP_ROUTES: Routes = [
  {
    path: 'inputDemos',
    component: InputDemoComponent,
    data: {label: 'InputDemo'}
  }
];


