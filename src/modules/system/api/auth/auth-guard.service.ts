import {Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AUTH_SERVICE_PROVIDER, IAuthServiceProvider} from './IAuthServiceProvider';
import {AUTH_SERVICE_GUARD_PROVIDER, IAuthGuardProvider} from './IAuthGuardProvider';


@Injectable()
export class AuthGuardService implements IAuthGuardProvider {

  guardProvider: IAuthGuardProvider;

  constructor(private injector: Injector) {
    this.guardProvider = injector.get(AUTH_SERVICE_GUARD_PROVIDER);
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.guardProvider.canActivate(route, state);

  }


}
