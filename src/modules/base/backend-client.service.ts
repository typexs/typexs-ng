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
import {catchError, filter, first, mergeMap, tap} from 'rxjs/operators';
import {Log} from './lib/log/Log';
import {UrlHelper} from './lib/UrlHelper';
import {ErrorHelper} from './lib/ErrorHelper';
import {CryptUtils} from 'commons-base/browser';


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
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.logChannel = messageService.getLogService();
    // this.state.subscribe(x => Log.debug('backend state changed ' + x));
  }

  api = '/api';

  private serverTime: Date;

  private state: BehaviorSubject<BACKEND_CLIENT_STATE> = new BehaviorSubject<BACKEND_CLIENT_STATE>('initial');

  // private loading: BehaviorSubject<number> = new BehaviorSubject<boolean>(false)<;

  private routesLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private routes: IRoute[];

  private logChannel: MessageChannel<LogMessage>;

  private requestCache: { [k: string]: Subject<any> } = {};

  private activeCount = 0;


  /**
   * Test if backend is alive
   */
  ping() {
    return this.get(this.apiUrl(API_CTRL_SERVER_PING))
      .pipe(
        tap(
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
          })
      );
  }

  /**
   * Return the current state of service like if it is connected (online) or not offline.
   */
  getState() {
    return this.state;
  }

  getActiveCount() {
    return this.activeCount;
  }

  areRoutesLoaded(): Observable<boolean> {
    return this.routesLoaded.asObservable();
  }

  /**
   * Reload route informations from backend, this can happen
   */
  reloadRoutes(force: boolean = false) {
    const obs = new Subject();

    if (!force && (this.state.getValue() === 'offline' || this.state.getValue() === 'initial')) {
      setTimeout(() => {
        obs.next([]);
        obs.complete();
      }, 5);
    } else {
      if (this.routesLoaded.getValue() === false && !_.isUndefined(this.routes)) {
        // load only once, others should wait
        this.routesLoaded
          .pipe(filter(x => x))
          .pipe(first())
          .subscribe(x => {
            obs.next(this.routes);
          }, error => {
            obs.error(error);
          }, () => {
            obs.complete();
          });
        return obs;
      }
      this.routesLoaded.next(false);
      this.routes = [];

      this.state.next('loading');
      this.get(this.apiUrl(API_CTRL_SERVER_ROUTES)).subscribe((routes: IRoute[]) => {
        this.routes = routes;
        this.state.next('online');
        this.routesLoaded.next(true);
        obs.next(this.routes);
      }, error => {
        this.state.next('inactive');
        obs.error(error);
      }, () => {
        obs.complete();
      });
    }
    return obs.asObservable();
  }


  check() {
    const obs = new Subject();
    this.ping().subscribe(
      x => {
        const ping = this.state.getValue();
        if (ping === 'offline') {
          this.resetRoutes(true);
          obs.next(false);
          obs.complete();
        } else if (ping === 'online') {
          this.reloadRoutes().subscribe(
            value => {
              obs.next(true);
            },
            error => {
              obs.next(false);
            },
            () => {
              obs.complete();
            });
        }
      },
      error => {
        obs.next(false);
        obs.complete();
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
   * Add accessible route to service
   *
   * @param route
   */
  addRoute(route: IRoute) {
    if (!this.routes) {
      this.routes = [];
    }
    this.routes.push(route);
    this.routesLoaded.next(true);
  }


  /**
   * Reset routes.
   *
   * With the parameter "undef" can be set the reset value for routes variable.
   */
  resetRoutes(undef: boolean = false) {
    this.routes = !undef ? [] : undefined;
    this.routesLoaded.next(false);
  }

  /**
   *
   * @param context
   * @param options
   */
  callApi<T>(context: string | IRoutePointer, options?: IApiCallOptions): Observable<T> {
    const ret = new Subject();
    if (this.getState().getValue() === 'offline') {
      ret.error('Backend is offline.');
      ret.complete();
      return ret.asObservable() as any;
    }
    options = options || {};
    let cacheKey: string = null;

    const _method = _.isString(context) ? 'get' : _.get(context, 'method', 'get');
    const doCaching = _method === 'get';

    if (doCaching) {
      cacheKey = CryptUtils.shorthash(JSON.stringify({c: context, o: options}));
      if (this.requestCache[cacheKey]) {
        return this.requestCache[cacheKey].asObservable();
      }
      this.requestCache[cacheKey] = ret;
    }

    this.activeCount++;

    // @ts-ignore
    const sub = this.areRoutesLoaded().pipe(filter(x => x)).pipe(first()).subscribe(__x => {
        const apiContext = this.apiUrl(context);
        const route = this.getRoute(apiContext, _method);
        if (!route) {
          ret.error('Route "' + apiContext + '" not found, skipping.');
          ret.complete();
          this.activeCount--;
          return null;
        }

        // const state: Observable<BACKEND_CLIENT_STATE> = this.state.asObservable();
        // const sub = state.subscribe(x => {
        //   if (x === 'online' && this.routes.length > 0) {

        const method = route.method;
        const opts: IHttpRequestOptions = _.get(options, 'options', {});
        _.defaults(opts, {
          url: 'TODO',
          retry: 0
        });

        if (options.params) {
          opts.url = UrlHelper.replace(route.route as string, options.params);
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
          x => {
            ret.next(x);
          },
          error => {
            ret.error(error);
            this.activeCount--;
            if (cacheKey) {
              delete this.requestCache[cacheKey];
            }
          },
          () => {
            ret.complete();
            this.activeCount--;
            if (cacheKey) {
              delete this.requestCache[cacheKey];
            }
          }
        );
      },
      error => {
        Log.error(error);
        ret.error(error);
        ret.complete();
        this.activeCount--;
        if (cacheKey) {
          delete this.requestCache[cacheKey];
        }
      });
    return ret.asObservable() as any;
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

  put<T>(url: string | IHttpRequestOptions): Observable<T>;
  put<T>(url: string | IHttpRequestOptions, response?: (err: Error, data: T) => void): Observable<T> {
    const options: IHttpRequestOptions = _.isString(url) ? {url: url, logging: true} : url;
    if (response) {
      options.callback = response;
    }
    return this.handleRequest('put', options);
  }

  private handleRequest<T>(method: string, reqOptions: IHttpRequestOptions): Observable<T> {
    const logging = _.has(reqOptions, 'logging') ? reqOptions.logging : true;
    const client = this.getHttpClient();

    Log.debug('handle request ' + method + ' ' + reqOptions.url);
    let observable: Observable<T> = null;
    if (_.has(reqOptions, 'body')) {
      observable = client[method](reqOptions.url, reqOptions.body, reqOptions);
    } else {
      observable = client[method](reqOptions.url, reqOptions);
    }

    observable = observable.pipe(mergeMap((x: any) => {
      const filterErrors = ErrorHelper.detectErrors(x);
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
    }


    return observable;
  }

}
