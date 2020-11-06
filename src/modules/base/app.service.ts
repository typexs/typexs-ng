import {Injectable} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './api/auth/auth.service';
import {MessageService} from './messages/message.service';
import {AuthMessage} from './messages/types/AuthMessage';
import {C_ADMIN, CTXT_VIEW_ADMIN, CTXT_VIEW_DEFAULT, CTXT_VIEW_LOADING, CTXT_VIEW_LOGIN} from './constants';
import * as _ from 'lodash';
import {BackendClientService} from './backend-client.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Log} from './lib/log/Log';

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

  serviceClasses: { [name: string]: Function } = {};

  registerService(name: string, fn: Function) {
    this.serviceClasses[name] = fn;
  }

  getService(name: string) {
    if (this.serviceClasses[name]) {
      return this.serviceClasses[name];
    }
    return null;
  }

  constructor(
    private backendService: BackendClientService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {

    authService.getChannel().subscribe(this.onMessage.bind(this));
    router.events.subscribe(e => {

      if (e instanceof NavigationEnd) {
        this.adminUrl = e.urlAfterRedirects.startsWith('/' + C_ADMIN);
        if (this._isAdmin.value && this.adminUrl) {
          if (!this.isViewContext(CTXT_VIEW_ADMIN)) {
            this.setViewContext(CTXT_VIEW_ADMIN);
          }
        }
        if (this.isViewContext(CTXT_VIEW_ADMIN) && !this.adminUrl) {
          this.setViewContext(CTXT_VIEW_DEFAULT);
        }
      } else if (e instanceof NavigationCancel) {
        Log.debug('canceled ...');
      } else if (e instanceof NavigationError) {
        Log.debug('error ...');
      }
    });
  }


  getAuthService() {
    return this.authService;
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
      this.authService
        .isLoggedIn()
        .pipe(switchMap(logged => {
          if (logged) {
            return this.authService.hasRole(C_ADMIN);
          } else {
            this.setViewContext(CTXT_VIEW_LOGIN);
            return of(logged);
          }
        }))
        .subscribe(isAdmin => {
          this._isAdmin.next(isAdmin);
          if (isAdmin) {
            if (this.adminUrl && !this.isViewContext(CTXT_VIEW_ADMIN)) {
              this.setViewContext(CTXT_VIEW_ADMIN);
            } else {
              this.setViewContext(CTXT_VIEW_DEFAULT);
            }
          }
        });
    }
  }


  get isAdmin(): Observable<boolean> {
    return this._isAdmin.asObservable();
  }


}
