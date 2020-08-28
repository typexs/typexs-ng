import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './api/auth/auth.service';
import {MessageService} from './messages/message.service';
import {AuthMessage} from './messages/types/AuthMessage';
import {CTXT_VIEW_ADMIN, CTXT_VIEW_DEFAULT, CTXT_VIEW_LOADING, CTXT_VIEW_LOGIN} from './constants';
import * as _ from 'lodash';
import {BackendClientService} from './backend-client.service';

/**
 * The service is used for app status informations and distribution of this information on the front end.
 *
 * - backend check if exists
 * - loading status
 *
 */
@Injectable()
export class AppService {

  _isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  _viewMode: BehaviorSubject<string> = new BehaviorSubject<string>(CTXT_VIEW_LOADING);

  adminUrl = false;

  config: any = {};

  components: { [name: string]: Function } = {};


  constructor(
    private backendService: BackendClientService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {

    authService.getChannel().subscribe(this.onMessage.bind(this));
    router.events.subscribe(e => {

      if (e instanceof NavigationEnd) {
        this.adminUrl = e.urlAfterRedirects.startsWith('/admin');
        if (this._isAdmin.value && this.adminUrl) {
          if (!this.isViewContext(CTXT_VIEW_ADMIN)) {
            this.setViewContext(CTXT_VIEW_ADMIN);
          }
        }
        if (this.isViewContext(CTXT_VIEW_ADMIN) && !this.adminUrl) {
          this.setViewContext(CTXT_VIEW_DEFAULT);
        }

      }
    });
  }

  getBackendClient() {
    return this.backendService;
  }

  getComponentClass(...args: string[]) {
    const name = args.join('.');
    return _.get(this.components, name);
  }

  setComponentClass(name: string | string[], fn: Function) {
    if (_.isArray(name)) {
      name = name.join('.');
    }
    return _.set(this.components, name, fn);
  }


  getViewContext() {
    return this._viewMode.asObservable();
  }


  getViewContextValue() {
    return this._viewMode.value;
  }


  setViewContext(str: string) {
    this._viewMode.next(str);
  }


  isViewContext(str: string) {
    return this.getViewContextValue() === str;
  }


  getLogService() {
    return this.messageService.getLogService();
  }


  isAuthenticated() {
    return this.authService.isLoggedIn();
  }


  async onMessage(m: any) {
    if (m instanceof AuthMessage) {
      if (this.authService.isLoggedIn()) {
        const isAdmin = await this.authService.hasRole('admin');
        this._isAdmin.next(isAdmin);
        if (this.adminUrl && !this.isViewContext(CTXT_VIEW_ADMIN)) {
          this.setViewContext(CTXT_VIEW_ADMIN);
        } else {
          this.setViewContext(CTXT_VIEW_DEFAULT);
        }
      } else {
        this.setViewContext(CTXT_VIEW_LOGIN);
        this._isAdmin.next(false);
      }
    }
  }


  get isAdmin(): Observable<boolean> {
    return this._isAdmin.asObservable();
  }

}
