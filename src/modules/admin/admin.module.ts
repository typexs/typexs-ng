import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SystemModulesComponent} from './system/modules/system-modules.component';
import {NavigatorModule} from '../navigator/navigator.module';
import {ADMIN_ROUTES} from './admin.routes';


@NgModule({
  declarations: [AdminComponent, SystemModulesComponent],
  imports: [
    NavigatorModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  exports: []
})
export class AdminModule {


}
