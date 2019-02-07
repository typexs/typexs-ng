import {NgModule} from '@angular/core';
import {FormsModule} from '../forms/forms.module';
import {BrowserModule} from '@angular/platform-browser';
import {SystemModule} from '../system/system.module';
import {RouterModule} from '@angular/router';
import {FormsModule as NgFormsModule} from '@angular/forms';
import {StorageService} from './storage.service';
import {StorageTypesComponent} from './types/storage-types.component';
import {StorageStructComponent} from './struct/storage-struct.component';
import {StorageModifyComponent} from './modify/storage-modify.component';
import {StorageViewComponent} from './view/storage-view.component';
import {StorageQueryComponent} from './query/storage-query.component';
import {StorageDeleteComponent} from './delete/storage-delete.component';
import {StorageQueryInputComponent} from './query/storage-query-input.component';
import {StorageBackendsComponent} from './backends/storage-backends.component';

const PROVIDERS = [
  StorageService,
];

const COMPONENTS = [
  StorageTypesComponent,
  StorageStructComponent,
  StorageModifyComponent,
  StorageViewComponent,
  StorageQueryComponent,
  StorageQueryInputComponent,
  StorageDeleteComponent,
  StorageBackendsComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    SystemModule,
    BrowserModule,
    RouterModule,
    NgFormsModule,
    FormsModule
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

}
