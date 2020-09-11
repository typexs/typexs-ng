import {NgModule} from '@angular/core';
import {FormsModule} from '../forms/module';
import {BrowserModule} from '@angular/platform-browser';
import {BaseModule} from '../base/module';
import {RouterModule} from '@angular/router';
import {FormsModule as NgFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DISTRIBUTED_STORAGE_ROUTES} from './routes';
import {DistributedStorageService} from './services/distributed_storage.service';
import {DistributedStorageQueryEmbeddedComponent} from './components/query/embedded/query-embedded.component';
import {DistributedStorageQueryPageComponent} from './components/query/page/query-page.component';
import {AppService} from '../base/app.service';

const PROVIDERS = [
  DistributedStorageService,
];

const COMPONENTS: any[] = [
  DistributedStorageQueryEmbeddedComponent,
  DistributedStorageQueryPageComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    BaseModule,
    BrowserModule,
    RouterModule,
    NgFormsModule,
    FormsModule
  ],
  exports: COMPONENTS,
  providers: PROVIDERS
})
export class DistributedStorageModule {

  static forRoot() {
    return {
      ngModule: DistributedStorageModule,
      providers: PROVIDERS
    };
  }

  static getRoutes() {
    return DISTRIBUTED_STORAGE_ROUTES;
  }

  constructor(private appService: AppService) {
    // this.appService.registerService('DistributedStorageService', DistributedStorageService);
  }

}
