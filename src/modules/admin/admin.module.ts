import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SystemModulesComponent} from './system/modules/system-modules.component';
import {NavigatorModule} from '../navigator/navigator.module';
import {ADMIN_ROUTES} from './admin.routes';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {SystemRoutesComponent} from './system/routes/system-routes.component';
import {SystemStoragesComponent} from './system/storages/system-storages.component';
import {SystemInfoService} from './system/system-info.service';
import {SystemConfigComponent} from './system/config/system-config.component';
import {AdminService} from './admin.service';


@NgModule({
  declarations: [
    AdminComponent,
    SystemModulesComponent,
    SystemRoutesComponent,
    SystemStoragesComponent,
    SystemConfigComponent
  ],
  imports: [
    NavigatorModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  exports: [AdminComponent],
  providers: [SystemInfoService, AdminService]

})
export class AdminModule {


}
