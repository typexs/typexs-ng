import {NgModule} from '@angular/core';
import {FormsModule} from '../forms/module';
import {BrowserModule} from '@angular/platform-browser';
import {BaseModule} from '../base/module';
import {RouterModule} from '@angular/router';
import {FormsModule as NgFormsModule} from '@angular/forms';
import {StorageService} from './storage.service';
import {StorageTypesComponent} from './types/storage-types.component';
import {StorageStructComponent} from './struct/storage-struct.component';
import {StorageModifyComponent} from './modify/storage-modify.component';
import {StorageViewComponent} from './view/storage-view.component';
import {StorageQueryComponent} from './query/page/storage-query.component';
import {StorageDeleteComponent} from './delete/storage-delete.component';
import {StorageBackendsComponent} from './backends/storage-backends.component';
import {CommonModule} from '@angular/common';
import {StorageQueryEmbeddedComponent} from './query/embedded/storage-query-embedded.component';
import {STORAGE_ROUTES} from './routes';
import {StorageAggregateComponent} from './aggregate/page/storage-aggregate.component';
import {StorageAggregateEmbeddedComponent} from './aggregate/embedded/storage-aggregate-embedded.component';
import {AppService} from '../base/app.service';

const PROVIDERS = [
  StorageService,
];

const COMPONENTS = [
  StorageTypesComponent,
  StorageStructComponent,
  StorageModifyComponent,
  StorageViewComponent,
  StorageQueryComponent,
  StorageQueryEmbeddedComponent,
  StorageDeleteComponent,
  StorageBackendsComponent,
  StorageAggregateComponent,
  StorageAggregateEmbeddedComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    BaseModule,
    BrowserModule,
    RouterModule,
    NgFormsModule,
    FormsModule,
    // StorageRoutingModule
  ],
  exports: COMPONENTS,
  providers: PROVIDERS
})
export class StorageModule {

  static forRoot() {
    return {
      ngModule: StorageModule,
      providers: PROVIDERS
    };
  }

  static getRoutes(prefix?: string) {
    // if (prefix) {
    //   return STORAGE_ROUTES.map(x => {
    //     x.path = prefix + '/' + x.path;
    //   });
    // }
    return STORAGE_ROUTES;
  }


  constructor(private appService: AppService) {
    // this.appService.registerService('StorageService', StorageService);
  }

}
