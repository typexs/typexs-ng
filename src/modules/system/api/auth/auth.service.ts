import {AUTH_SERVICE_PROVIDER, IAuthServiceProvider} from './IAuthServiceProvider';
import {Injectable, Injector} from '@angular/core';
import {IUser} from '../../../../libs/api/auth/IUser';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthService<T extends IAuthServiceProvider> implements IAuthServiceProvider {

  authService: T;

  constructor(private injector: Injector) {
    this.authService = <T>injector.get(AUTH_SERVICE_PROVIDER);
  }

  getProvider(): T {
    return this.authService;
  }

  getPermissions(): Promise<string[]> | string[] {
    return this.authService.getPermissions();
  }

  getRoles(): Promise<string[]> | string[] {
    return this.authService.getRoles();
  }

  getUser(): Promise<IUser> | IUser {
    return this.authService.getUser();
  }

  hasPermission(right: string, params?: any): Promise<boolean> | boolean {
    return this.authService.hasPermission(right, params);
  }

  hasPermissionsFor(object: any): Promise<boolean> | boolean {
    return this.authService.hasPermissionsFor(object);
  }

  hasRole(role: string): Promise<boolean> | boolean {
    return this.authService.hasRole(role);
  }

  hasRoutePermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    return this.authService.hasRoutePermissions(route, state);
  }

  isLoggedIn(): Promise<boolean> | boolean {
    return this.authService.isLoggedIn();
  }

}
