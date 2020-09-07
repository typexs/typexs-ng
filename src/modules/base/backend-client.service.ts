import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {MessageService} from './messages/message.service';
import {MessageChannel} from './messages/MessageChannel';
import {LogMessage} from './messages/types/LogMessage';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {IApiCallOptions} from './lib/http/IApiCallOptions';
import {API_CTRL_SERVER_PING, API_CTRL_SERVER_ROUTES, IRoute} from '@typexs/server/browser';
import {IHttpRequestOptions} from './lib/http/IHttpRequestOptions';
import {catchError, mergeMap} from 'rxjs/operators';

export interface IRoutePointer {
  route: string;
  method?: 'get' | 'post' | 'delete' | 'put' | 'patch';
}


/**
 *
 * Lifecycle
 *
 *  initial -> online -> idle -> offline
 *          -> offline -> online
 */
export type BACKEND_CLIENT_STATE = 'inactive' | 'offline' | 'online' | 'loading' | 'initial';

/**
 * The primary communication handler to the backend
 *
 * - handles HTTP Requests to the backend, loads allowed routes
 */
@Injectable()
export class BackendClientService {


  /**
   * Initialize with
   *
   * @param http
   * @param messageService
   */
  constructor(private http: HttpClient, private messageService: MessageService) {
    this.logChannel = messageService.getLogService();
    // this.state.subscribe(x => console.log('backend state changed ' + x));
  }

  api = '/api';

  private serverTime: Date;

  private state: BehaviorSubject<BACKEND_CLIENT_STATE> = new BehaviorSubject<BACKEND_CLIENT_STATE>('initial');

  private routes: IRoute[] = [];

  private logChannel: MessageChannel<LogMessage>;


  static url(url: string, replace: any = null) {
    if (replace) {
      _.keys(replace).forEach(k => {
        url = url.replace(':' + k, replace[k]);
      });
    }
    return url;
  }


  static detectErrors(data: any) {
    if (_.isArray(data)) {
      const errors = [];
      for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        const e = this.detectError(entry);
        if (e) {
          _.assign(e, {
            index: i,
            nodeId: entry.nodeId,
            instNr: entry.instNr,
          });
          errors.push(e);
        }
      }
      return errors;
    } else {
      const e = this.detectError(data);
      if (e) {
        _.assign(e, {
          index: null,
          nodeId: data.nodeId,
          instNr: data.instNr,
        });
        return [e];
      } else {
        return [];
      }
    }
  }


  static detectError(entry: any) {
    if (_.has(entry, 'error') && _.has(entry, 'message')) {
      return new Error(entry.message);
    }
    return null;

  }

  /**
   * Test if backend is alive
   */
  ping() {
    const observable = this.get(this.apiUrl(API_CTRL_SERVER_PING));
    observable.subscribe(
      value => {
        if (value && _.has(value, 'time')) {
          this.serverTime = new Date(_.get(value, 'time'));
          this.state.next('online');
        } else {
          this.state.next('inactive');
        }
      },
      error => {
        this.state.next('offline');
        // handle errors for example unreachable
      }
    );
    return observable;
  }

  getState() {
    return this.state;
  }

  /**
   * Reload route informations from backend, this can happen
   */
  reloadRoutes() {
    const obs = new Subject();
    if (this.state.getValue() === 'offline' || this.state.getValue() === 'initial') {
      setTimeout(() => {
        obs.next([]);
        obs.complete();
      }, 5);
    } else {
      this.state.next('loading');
      this.get(this.apiUrl(API_CTRL_SERVER_ROUTES)).subscribe((routes: IRoute[]) => {
        this.routes = routes;
        obs.next(this.routes);
        obs.complete();
        this.state.next('online');
      });
    }
    return obs.asObservable();
  }


  check() {
    const obs = new Subject();
    this.ping().subscribe(x => {
      const ping = this.state.getValue();
      if (ping === 'offline') {
        obs.next(false);
        obs.complete();
      } else if (ping === 'online') {
        this.reloadRoutes().subscribe(value => {
            obs.next(true);
            obs.complete();
          },
          error => {
            obs.next(false);
            obs.complete();
          });
      }
    });
    return obs.asObservable();
  }


  getHttpClient() {
    return this.http;
  }


  getHttpLogChannel() {
    return this.logChannel;
  }

  apiUrl(context: string | IRoutePointer): string {
    return this.api + (_.isString(context) ? context : (<IRoutePointer>context).route);
  }


  getRoute(route: string, method: string = 'get') {
    const routes = this.routes.filter(x => x.route === route);
    if (routes.length === 1) {
      return routes.shift();
    } else {
      return routes.find(x => x.method === method);
    }
  }

  /**
   *
   * @param context
   * @param options
   */
  callApi<T>(context: string | IRoutePointer, options?: IApiCallOptions): Observable<T> {
    if (this.getState().getValue() === 'offline') {
      const s = new Subject();
      s.error('Backend is offline.');
      s.complete();
      return s.asObservable() as any;
    }
    options = options || {};
    // @ts-ignore
    const ret = new Subject<T>();
    const state: Observable<BACKEND_CLIENT_STATE> = this.state.asObservable();
    state.subscribe(x => {
      if (x === 'online' && this.routes.length > 0) {
        const apiContext = this.apiUrl(context);
        const route = this.getRoute(apiContext, _.isString(context) ? 'get' : context.method);

        if (!route) {
          ret.error('route ' + apiContext + ' not found.');
          ret.complete();
          return;
        }

        const method = route.method;
        const opts: IHttpRequestOptions = {
          url: 'TODO',
        };


        if (options.params) {
          opts.url = BackendClientService.url(route.route as string, options.params);
        } else {
          opts.url = apiContext;
        }

        if (options.query) {
          const queryParts: string[] = [];
          for (const q of _.keys(options.query)) {
            const value = options.query[q];
            if (_.isObjectLike(value) || _.isArrayLike(value)) {
              queryParts.push(q + '=' + JSON.stringify(value));
            } else {
              queryParts.push(q + '=' + value);
            }
          }
          if (!_.isEmpty(queryParts)) {
            opts.url += '?' + queryParts.join('&');
          }
        }

        if (options.content) {
          opts.body = options.content;
        }

        if (options.handle) {
          opts.callback = options.handle;
        }

        (this[method](opts) as Observable<T>).subscribe(
          x => ret.next(x),
          error => ret.error(error),
          () => ret.complete()
        );
      }
    }, error => console.error(error));
    return ret.asObservable();

  }

  /**
   * Implementation of get http method, which will also handle request errors
   *
   * @param url
   */
  get<T>(url: string | IHttpRequestOptions): Observable<T>;
  get<T>(url: string | IHttpRequestOptions, response?: (err: Error, data: T) => void): Observable<T> {
    const options: IHttpRequestOptions = _.isString(url) ? {url: url, logging: true} : url;
    if (response) {
      options.callback = response;
    }
    return this.handleRequest('get', options);
  }

  post<T>(url: string | IHttpRequestOptions, body: any | null): Observable<T>;
  post<T>(url: string | IHttpRequestOptions, body: any | null, response?: (err: Error, data: T) => void): Observable<T> {
    const options: IHttpRequestOptions = _.isString(url) ? {url: url, logging: true, body: body} : url;
    if (body) {
      options.body = body;
    }
    if (response) {
      options.callback = response;
    }
    return this.handleRequest('post', options);
  }

  delete<T>(url: string | IHttpRequestOptions): Observable<T>;
  delete<T>(url: string | IHttpRequestOptions, response?: (err: Error, data: T) => void): Observable<T> {
    const options: IHttpRequestOptions = _.isString(url) ? {url: url, logging: true} : url;
    if (response) {
      options.callback = response;
    }
    return this.handleRequest('delete', options);
  }

  private handleRequest<T>(method: string, reqOptions: IHttpRequestOptions): Observable<T> {
    const logging = _.has(reqOptions, 'logging') ? reqOptions.logging : true;
    const client = this.getHttpClient();
    // const requestMethod = client[method];

    console.log('handle request ' + method, reqOptions);
    let observable: Observable<T> = null;
    if (_.has(reqOptions, 'body')) {
      observable = client[method](reqOptions.url, reqOptions.body, reqOptions);
    } else {
      observable = client[method](reqOptions.url, reqOptions);
    }

    observable = observable.pipe(mergeMap((x: any) => {
      console.log('=> ' + method + ' ' + reqOptions.url);
      const filterErrors = BackendClientService.detectErrors(x);
      if (filterErrors.length > 0) {
        throw filterErrors[0];
      }
      return of(x);
    }));

    if (_.has(reqOptions, 'callback')) {
      observable.subscribe(
        async value => {

          try {
            await reqOptions.callback(null, value);
          } catch (err) {
            if (logging) {
              this.logChannel.publish(LogMessage.error(err));
            }
          }
        },
        async error => {
          try {
            await reqOptions.callback(error, null);
          } catch (err) {
            if (logging) {
              this.logChannel.publish(LogMessage.error(error));
            }
          }
        });
    } else {
      observable.pipe(
        catchError((error: Error) => {
          if (logging) {
            this.logChannel.publish(LogMessage.error(error));
          }
          throw error;
        })
      );
      // observable.subscribe(
      //   value => {
      //   },
      //   error => {
      //   });
    }


    return observable;
  }

}
