import {ModuleWithProviders, NgModule} from '@angular/core';
import {SystemInfoService} from './system-info.service';
import {AuthService} from './api/auth/auth.service';
import {AuthGuardService} from './api/auth/auth-guard.service';

@NgModule({
  declarations: [
  ],
  imports: [],
  exports: [
  ],
  providers: [
    SystemInfoService,
    AuthService,
    AuthGuardService
  ]
})
export class SystemModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SystemModule,
      providers: [
        AuthService,
        AuthGuardService,
        SystemInfoService
      ]
    };
  }

}
