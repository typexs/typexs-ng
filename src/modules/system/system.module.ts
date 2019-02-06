import {ModuleWithProviders, NgModule} from '@angular/core';
import {SystemInfoService} from './system-info.service';

import {DefaultAuthGuardService} from './api/auth/default-auth-guard.service';
import {NoopAuthService} from './api/auth/noop-auth.service';

import {AuthService} from './api/auth/auth.service';
import {AuthGuardService} from './api/auth/auth-guard.service';
import {MessageService} from './messages/message.service';
import {AlertComponent} from './messages/alert.component';
import {BrowserModule} from '@angular/platform-browser';
import {PagerComponent} from './pager/pager.component';
import {PagerService} from './pager/PagerService';
import {AppStateService} from './app.state.service';
import {InvokerService} from './invoker.service';
import {HttpClientWrapper} from './http-client-wrapper.service';
import {DataTableDirective} from './directive/datatables.directive';

const PROVIDERS = [
  SystemInfoService,
  AuthService,
  AuthGuardService,
  {provide: AuthService, useClass: NoopAuthService},
  {provide: AuthGuardService, useClass: DefaultAuthGuardService},
  MessageService,
  PagerService,
  AppStateService,
  InvokerService,
  HttpClientWrapper
];

@NgModule({
  declarations: [
    AlertComponent,
    PagerComponent,
    DataTableDirective
  ],
  imports: [BrowserModule],
  exports: [
    AlertComponent,
    PagerComponent,
    DataTableDirective
  ],
  providers: PROVIDERS
})
export class SystemModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SystemModule,
      providers: PROVIDERS
    };
  }

}
