import {NgModule, Provider} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RouterMenuModule} from '@typexs/ng-router-menu';
import {FormsModule} from '../forms/module';
import {BaseModule} from '@typexs/base-ng';
import {BaseAdminThemeComponent} from './base_admin_theme.component';
import {ToggleDirective} from './toggle.directive';
import {PerfectScrollbarDirective} from './perfect-scrollbar.directive';
import {WrapperComponent} from './components/wrapper/wrapper.component';
import {CardComponent} from './components/card/card.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {NotificationsService} from './components/notifications/notifications.service';
import {CommonModule} from '@angular/common';

const PROVIDERS: Provider[] = [
  NotificationsService
];


@NgModule({
  declarations: [
    WrapperComponent,
    CardComponent,
    BaseAdminThemeComponent,
    ToggleDirective,
    PerfectScrollbarDirective,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterMenuModule.forRoot(),
    BaseModule.forRoot(),
    RouterModule,
    FormsModule
  ],
  exports: [
    BaseAdminThemeComponent,
    ToggleDirective,
    PerfectScrollbarDirective,
    WrapperComponent,
    CardComponent,
    NotificationsComponent
  ],
  providers: PROVIDERS
})
export class BaseAdminThemeModule {


  static forRoot() {
    return {
      ngModule: BaseAdminThemeModule,
      providers: PROVIDERS
    };
  }


}
