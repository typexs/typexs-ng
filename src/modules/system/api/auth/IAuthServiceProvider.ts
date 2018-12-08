import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {IUser} from '../../../../libs/api/auth/IUser';
import {Observable} from 'rxjs/Observable';


export interface IAuthServiceProvider {

  isLoggedIn(): boolean;

  hasRoutePermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;

  hasPermission(right: string, params?: any): Observable<boolean> | Promise<boolean> | boolean;

  hasPermissionsFor?(object: any): Observable<boolean> | Promise<boolean> | boolean;

  getUser(): Observable<IUser> | Promise<IUser> | IUser;

  getRoles?(): Observable<string[]> | Promise<string[]> | string[];

  hasRole?(role: string): Observable<boolean> | Promise<boolean> | boolean;

  getPermissions?(): Observable<string[]> | Promise<string[]> | string[];

}

