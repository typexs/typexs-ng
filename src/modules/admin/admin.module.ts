import {NgModule, Provider} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SystemModulesComponent} from './system/modules/system-modules.component';
import {NavigatorModule} from '../navigator/navigator.module';
import {ADMIN_ROUTES} from './admin.routes';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {SystemRoutesComponent} from './system/routes/system-routes.component';
import {SystemStoragesComponent} from './system/storages/system-storages.component';

import {SystemConfigComponent} from './system/config/system-config.component';
import {NgRoutesComponent} from './ng/routes/ng-routes.component';
import {FormsModule} from '../forms/forms.module';
import {SystemModule} from '../system/system.module';
import {EntityModule} from '../entity/entity.module';
import {NavigatorService} from '../navigator/navigator.service';

const PROVIDERS: Provider[] = [];


@NgModule({
  declarations: [
    AdminComponent,
    SystemModulesComponent,
    SystemRoutesComponent,
    SystemStoragesComponent,
    SystemConfigComponent,
    NgRoutesComponent
  ],
  imports: [
    SystemModule.forRoot(),
    NavigatorModule.forRoot(),
    RouterModule,
    FormsModule,
    EntityModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  exports: [
    AdminComponent
  ],
  providers: PROVIDERS
})
export class AdminModule {

  static forRoot() {
    return {
      ngModule: AdminModule,
      providers: PROVIDERS
    };
  }

  constructor(private navigator: NavigatorService) {
    // Startup stuff should be done once!
    this.navigator.addGroupEntry('admin/system/.*', {label: 'System', group: 'admin'});
    this.navigator.addGroupEntry('admin/ng/.*', {label: 'Angular', group: 'admin'});
    this.navigator.addGroupEntry('admin/entity/.*', {label: 'Entity', group: 'admin'});
  }


}
