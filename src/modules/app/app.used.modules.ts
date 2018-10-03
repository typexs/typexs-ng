

import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ModuleWithProviders, Type} from '@angular/core';
import {APP_ROUTES} from './app.routes';

import {FormsModule} from '@angular/forms';
import {AdminModule} from '../admin/admin.module';
import {NavigatorModule} from '../navigator/navigator.module';
import {ThemeModule} from '../theme/theme.module';
import {xFormsModule} from '../xsform/xforms.module';
import {xViewsModule} from '../xsview/xviews.module';


export const APP_MODULES: Array<Type<any> | ModuleWithProviders | any[]> = [
  BrowserModule,
  FormsModule,
  xFormsModule,
  xViewsModule,
  AdminModule,
  NavigatorModule,
  ThemeModule,
  RouterModule.forRoot(APP_ROUTES)
];
