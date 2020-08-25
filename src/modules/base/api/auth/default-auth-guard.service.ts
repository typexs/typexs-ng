import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {IAuthGuardProvider} from './IAuthGuardProvider';
import {AuthService} from './auth.service';


@Injectable()
export class DefaultAuthGuardService implements IAuthGuardProvider {

  constructor(private authService: AuthService) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isLoggedIn() && this.authService.hasRoutePermissions(route, state);

  }
}
