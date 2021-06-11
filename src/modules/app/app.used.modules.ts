import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ModuleWithProviders, Type} from '@angular/core';
import {BaseModule} from '@typexs/ng-base';
import {FormsModule as NgFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AgGridModule} from 'ag-grid-angular';

import {APP_ROUTES} from './routes';

import {AdminModule} from '../admin/module';
import {NavigatorModule} from '../navigator/module';
import {FormsModule} from '../forms/module';
import {BaseAdminThemeModule} from '../base_admin_theme/base_admin_theme.module';
import {StorageModule} from '../storage/module';
import {EntityModule} from '../entity/module';
import {DistributedStorageModule} from '../distributed_storage/module';


export const APP_MODULES: Array<Type<any> | ModuleWithProviders<any> | any[]> = [
  BrowserModule,
  HttpClientModule,
  BaseModule.forRoot(),
  NgFormsModule,
  NavigatorModule,
  AdminModule,
  FormsModule.forRoot(),
  BaseAdminThemeModule,
  AgGridModule.withComponents(),
  RouterModule.forRoot(APP_ROUTES),
  StorageModule,
  EntityModule,
  DistributedStorageModule
];
