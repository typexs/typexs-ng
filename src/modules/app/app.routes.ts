import {Routes} from '@angular/router';
import {XSTestComponent} from '../xsform/xstest.component';


export const APP_ROUTES: Routes = [
  {
    path: 'xstest',
    component: XSTestComponent,
    data: {label: 'XSTest'}
  }
];


