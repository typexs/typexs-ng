import {Injectable} from '@angular/core';
import {IAuthServiceProvider} from './IAuthServiceProvider';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AnonymusUser} from '../../../../libs/api/auth/AnonymusUser';
import {IUser} from '../../../../libs/api/auth/IUser';
import {MessageService} from '../../messages/message.service';

import {MessageChannel} from '../../messages/MessageChannel';
import {MessageType} from '../../messages/IMessage';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MESSAGE_TYPE_AUTH_SERVICE} from '../../constants';
import {AuthMessage} from '../../messages/types/AuthMessage';

@Injectable()
export class NoopAuthService implements IAuthServiceProvider {

  user: IUser = new AnonymusUser();

  private _initialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private messageService: MessageService) {
  }

  init() {
    let msg = new AuthMessage();
    msg.type = MessageType.SUCCESS;
    msg.topic = 'set user';
    this.getChannel().publish(msg);
    this._initialized.next(true);
    this._initialized.complete();

  }

  isInitialized(): Observable<boolean> | Promise<boolean> | boolean {
    return this._initialized;
  }

  getChannel(): MessageChannel<AuthMessage> {
    return <MessageChannel<AuthMessage>>this.messageService.get(MESSAGE_TYPE_AUTH_SERVICE);
  }

  isLoggedIn(): boolean {
    return true;
  }

  getUser<T extends IUser>(): T {
    return <T>this.user;
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
    return true;
  }

  hasPermission(right: string, params?: any): boolean {
    return true;
  }

  hasRole(role: string): boolean {
    return true;
  }
}

