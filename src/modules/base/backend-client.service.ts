import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {MessageService} from './messages/message.service';
import {MessageChannel} from './messages/MessageChannel';
import {LogMessage} from './messages/types/LogMessage';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IApiCallOptions} from './lib/http/IApiCallOptions';
import {API_CTRL_SERVER_PING, API_CTRL_SERVER_ROUTES, IRoute} from '@typexs/server/browser';
import {IHttpRequestOptions} from './lib/http/IHttpRequestOptions';

/**
 * The primary communication handler to the backend
 *
 * - handles HTTP Requests to the backend, loads allowed routes
 */
@Injectable()
export class BackendClientService {

  api = '/api';

  private serverTime: Date;

  private active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private routes: IRoute[] = [];

  private logChannel: MessageChannel<LogMessage>;


  /**
   * Initialize with
   *
   * @param http
   * @param messageService
   */
  constructor(private http: HttpClient, private messageService: MessageService) {
    this.logChannel = messageService.getLogService();
  }

  static url(url: string, replace: any = null) {
    if (replace) {
      _.keys(replace).forEach(k => {
        url = url.replace(':' + k, replace[k]);
      });
    }
    return url;
  }

  /**
   * Test if backend is alive
   */
  ping() {
    const observable = this.getHttpClient().get(API_CTRL_SERVER_PING);
    observable.subscribe(
      value => {
        if (value && _.has(value, 'time')) {
          this.serverTime = new Date(_.get(value, 'time'));
          this.active.next(true);
        } else {
          this.active.next(false);
        }
      },
      error => {
        this.active.next(false);
        // handle errors for example unreachable
      }
    );
    return observable;
  }

  /**
   * Reload route informations from backend, this can happen
   */
  reloadRoutes() {
    return this.http.get(API_CTRL_SERVER_ROUTES).subscribe((routes: IRoute[]) => {
      this.routes = routes;
    });
  }

  getHttpClient() {
    return this.http;
  }


  getHttpLogChannel() {
    return this.logChannel;
  }

  /**
   *
   * @param context
   * @param options
   */
  callApi<T>(context: string, options?: IApiCallOptions): Observable<T> {
    const route = this.routes.find(x => x.route === context);
    const method = route.method;

    const opts: IHttpRequestOptions = {
      url: 'TODO',
    };

    if (options.params) {
      opts.url = this.api + BackendClientService.url(context, options.params);
    } else {
      opts.url = this.api + context;
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
      opts.url += '?' + queryParts.join('&');
    }

    if (options.content) {
      opts.body = options.content;
    }

    if (options.handle) {
      opts.callback = options.handle;
    }

    return this[method](opts);
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
    const logging = _.has(reqOptions, 'logging') ? reqOptions.logging : false;
    const client = this.getHttpClient();
    const requestMethod = client[method];

    let observable: Observable<T> = null;
    if (_.has(reqOptions, 'body')) {
      observable = client[method](reqOptions.url, reqOptions.body, reqOptions);
    } else {
      observable = client[method](reqOptions.url, reqOptions);
    }

    if (_.has(reqOptions, 'response')) {
      observable.subscribe(
        async value => {
          try {
            await reqOptions.callback(null, value);
          } catch (err) {
            console.error(err);
          }
        },
        async error => {
          try {
            await reqOptions.callback(error, null);
          } catch (err) {
            console.error(err);
          }
        });
    }

    observable.subscribe(
      value => {
      },
      async error => {
        if (logging) {
          this.logChannel.publish(LogMessage.error(error));
        }
      });

    return observable;
  }


}
