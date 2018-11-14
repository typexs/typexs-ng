import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {IUser} from './IUser';


export interface IAuthService {

  isLoggedIn(): boolean;

  hasRoutePermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;

  hasPermission(right: string, params?: any): boolean;

  hasPermissionsFor?(object: any): boolean;

  getUser(): IUser;

  getRoles?(): string[];

  hasRole?(role: string): boolean;

  getPermissions?(): string[];

}
