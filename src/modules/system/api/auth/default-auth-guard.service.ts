import {Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AUTH_SERVICE_PROVIDER, IAuthServiceProvider} from './IAuthServiceProvider';
import {IAuthGuardProvider} from './IAuthGuardProvider';


@Injectable()
export class DefaultAuthGuardService implements IAuthGuardProvider {

  authService : IAuthServiceProvider;

  constructor(private injector: Injector, private router: Router) {
    this.authService = injector.get(AUTH_SERVICE_PROVIDER);
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isLoggedIn() && this.authService.hasRoutePermissions(route, state);

  }
}
