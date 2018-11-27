import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {IUser} from '../../../../libs/api/auth/IUser';
import {InjectionToken} from '@angular/core';


export interface IAuthServiceProvider {

  isLoggedIn(): boolean;

  hasRoutePermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean;

  hasPermission(right: string, params?: any): Promise<boolean> | boolean;

  hasPermissionsFor?(object: any): Promise<boolean> | boolean;

  getUser():Promise<IUser>| IUser;

  getRoles?():Promise<string[]> |  string[];

  hasRole?(role: string): Promise<boolean> | boolean;

  getPermissions?():Promise<string[]> |  string[];

}

