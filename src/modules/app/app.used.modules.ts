

import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ModuleWithProviders, Type} from '@angular/core';
import {APP_ROUTES} from './routes';

import {FormsModule as NgFormsModule} from '@angular/forms';
import {AdminModule} from '../admin/module';
import {NavigatorModule} from '../navigator/module';
import {FormsModule} from '../forms/module';
import {ViewsModule} from '../views/views.module';
import {BaseModule} from '../base/module';
import {BaseAdminThemeModule} from '../base_admin_theme/base_admin_theme.module';
import {AgGridModule} from 'ag-grid-angular';
import {StorageModule} from '../storage/storage.module';


export const APP_MODULES: Array<Type<any> | ModuleWithProviders | any[]> = [
  BrowserModule,
  RouterModule.forRoot(APP_ROUTES),
  BaseModule.forRoot(),
  NgFormsModule,
  NavigatorModule,
  ViewsModule,
  AdminModule,
  FormsModule.forRoot(),
  BaseAdminThemeModule,
  AgGridModule.withComponents(),
  StorageModule
];
