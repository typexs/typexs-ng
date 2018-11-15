import {Injectable} from '@angular/core';
import {IAuthService} from './IAuthService';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AnonymusUser} from '../../../../libs/api/auth/AnonymusUser';
import {IUser} from '../../../../libs/api/auth/IUser';


@Injectable()
export class AuthService implements IAuthService {

  user: IUser = new AnonymusUser();


  isLoggedIn(): boolean {
    return true;
  }

  getUser(): IUser {
    return this.user;
  }

  getPermissions(): string[] {
    return [];
  }

  getRoles(): string[] {
    return [];
  }

  hasRoutePermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

  hasPermissionsFor(object: any): boolean {
    return false;
  }

  hasPermission(right: string, params?: any): boolean {
    return false;
  }

  hasRole(role: string): boolean {
    return false;
  }
}
