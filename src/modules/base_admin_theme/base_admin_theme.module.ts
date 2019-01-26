import {NgModule, Provider} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavigatorModule} from '../navigator/navigator.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '../forms/forms.module';
import {SystemModule} from '../system/system.module';
import {BaseAdminThemeComponent} from './base_admin_theme.component';
import {ToggleDirective} from './toggle.directive';
import {PerfectScrollbarDirective} from './perfect-scrollbar.directive';
import {WrapperComponent} from './components/wrapper/wrapper.component';
import {CardComponent} from './components/card/card.component';

const PROVIDERS: Provider[] = [
];


@NgModule({
  declarations: [
    WrapperComponent,
    CardComponent,
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
    BaseAdminThemeComponent,
    ToggleDirective,
    PerfectScrollbarDirective,
    WrapperComponent,
    CardComponent
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
