import {ModuleWithProviders, NgModule} from '@angular/core';
import {SystemInfoService} from './system-info.service';

import {DefaultAuthGuardService} from './api/auth/default-auth-guard.service';
import {AUTH_SERVICE_PROVIDER} from './api/auth/IAuthServiceProvider';
import {NoopAuthService} from './api/auth/noop-auth.service';
import {AUTH_SERVICE_GUARD_PROVIDER} from './api/auth/IAuthGuardProvider';
import {AuthService} from './api/auth/auth.service';
import {AuthGuardService} from './api/auth/auth-guard.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    SystemInfoService,
    AuthService,
    AuthGuardService,
    {provide: AUTH_SERVICE_PROVIDER, useClass: NoopAuthService},
    {provide: AUTH_SERVICE_GUARD_PROVIDER, useClass: DefaultAuthGuardService},

  ]
})
export class SystemModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SystemModule,
      providers: [
        {provide: AUTH_SERVICE_PROVIDER, useClass: NoopAuthService},
        {provide: AUTH_SERVICE_GUARD_PROVIDER, useClass: DefaultAuthGuardService},
        SystemInfoService,
        AuthService,
        AuthGuardService
      ]
    };
  }

}
