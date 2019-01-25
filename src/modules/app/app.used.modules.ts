

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
import {BaseAdminThemeModule} from '../base_admin_theme/base_admin_theme.module';


export const APP_MODULES: Array<Type<any> | ModuleWithProviders | any[]> = [
  BrowserModule,
  RouterModule.forRoot(APP_ROUTES),
  NavigatorModule.forRoot(),
  NgFormsModule,
  FormsModule,
  ViewsModule,
  AdminModule,
  SystemModule.forRoot(),
  BaseAdminThemeModule
];
