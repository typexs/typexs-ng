import {CanActivate} from '@angular/router';
import {InjectionToken} from '@angular/core';


export interface IAuthGuardProvider extends CanActivate {
  
}



export const AUTH_SERVICE_GUARD_PROVIDER = new InjectionToken<IAuthGuardProvider>('TXS_AUTH_SERVICE_GUARD');
