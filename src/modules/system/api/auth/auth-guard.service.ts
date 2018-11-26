import {Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AUTH_SERVICE_PROVIDER, IAuthServiceProvider} from './IAuthServiceProvider';
import {AUTH_SERVICE_GUARD_PROVIDER, IAuthGuardProvider} from './IAuthGuardProvider';


@Injectable()
export class AuthGuardService<T extends IAuthGuardProvider> implements IAuthGuardProvider {

  guardProvider: T;

  constructor(private injector: Injector) {
    this.guardProvider = <T>injector.get(AUTH_SERVICE_GUARD_PROVIDER);
  }

  getProvider(): T {
    return this.guardProvider;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.guardProvider.canActivate(route, state);
  }

}
