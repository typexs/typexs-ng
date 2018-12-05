

import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ModuleWithProviders, Type} from '@angular/core';
import {APP_ROUTES} from './app.routes';

import {FormsModule as NgFormsModule} from '@angular/forms';
import {AdminModule} from '../admin/admin.module';
import {NavigatorModule} from '../navigator/navigator.module';
import {FormsModule} from '../forms/forms.module';
import {ViewsModule} from '../views/views.module';
import {SystemModule} from '../system/system.module';


export const APP_MODULES: Array<Type<any> | ModuleWithProviders | any[]> = [
  BrowserModule,
  NgFormsModule,
  FormsModule,
  ViewsModule,
  AdminModule,
  NavigatorModule,
  RouterModule.forRoot(APP_ROUTES),
  SystemModule.forRoot()
];
