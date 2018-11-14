import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {IAuthGuard} from './IAuthGuard';


@Injectable()
export class AuthGuardService implements IAuthGuard {

  constructor(private authService: AuthService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isLoggedIn() && this.authService.hasRoutePermissions(route, state);

  }
}
