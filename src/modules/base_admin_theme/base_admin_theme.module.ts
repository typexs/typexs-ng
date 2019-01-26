import {NgModule, Provider} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavigatorModule} from '../navigator/navigator.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '../forms/forms.module';
import {SystemModule} from '../system/system.module';
import {BaseAdminThemeComponent} from './base_admin_theme.component';
import {ToggleDirective} from './toggle.directive';
import {PerfectScrollbarDirective} from './perfect-scrollbar.directive';

const PROVIDERS: Provider[] = [,
  ToggleDirective,
  PerfectScrollbarDirective
];


@NgModule({
  declarations: [
    BaseAdminThemeComponent,
    ToggleDirective,
    PerfectScrollbarDirective
  ],
  imports: [
    SystemModule.forRoot(),
    NavigatorModule.forRoot(),
    RouterModule,
    FormsModule,
    BrowserModule
  ],
  exports: [
    BaseAdminThemeComponent
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
