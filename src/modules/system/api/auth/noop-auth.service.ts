import {Injectable} from '@angular/core';
import {IAuthServiceProvider} from './IAuthServiceProvider';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AnonymusUser} from '../../../../libs/api/auth/AnonymusUser';
import {IUser} from '../../../../libs/api/auth/IUser';
import {MessageService} from '../../messages/message.service';
import {AuthMessage} from './AuthMessage';
import {MessageChannel} from '../../messages/MessageChannel';
import {MessageType} from '../../messages/IMessage';


@Injectable()
export class NoopAuthService implements IAuthServiceProvider {

  user: IUser = new AnonymusUser();

  constructor(private messageService: MessageService) {
  }

  init() {
    let msg = new AuthMessage();
    msg.type = MessageType.Success;
    msg.topic = 'set user';
    this.getChannel().publish(msg);
  }

  getChannel(): MessageChannel<AuthMessage> {
    return <MessageChannel<AuthMessage>>this.messageService.get('AuthService');
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

