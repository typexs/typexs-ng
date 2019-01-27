import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {IUser} from '../../../../libs/api/auth/IUser';
import {Observable} from 'rxjs/Observable';
import {MessageChannel} from '../../messages/MessageChannel';
import {AuthMessage} from './AuthMessage';


export interface IAuthServiceProvider {

  init(): void;

  isInitialized(): Observable<boolean> | Promise<boolean> | boolean;

  getChannel(): MessageChannel<AuthMessage>;

  isLoggedIn(): boolean;

  hasRoutePermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;

  hasPermission(right: string, params?: any): Observable<boolean> | Promise<boolean> | boolean;

  hasPermissionsFor?(object: any): Observable<boolean> | Promise<boolean> | boolean;

  getUser(): Observable<IUser> | Promise<IUser> | IUser;

  getRoles?(): Observable<string[]> | Promise<string[]> | string[];

  hasRole?(role: string): Observable<boolean> | Promise<boolean> | boolean;

  getPermissions?(): Observable<string[]> | Promise<string[]> | string[];

}

