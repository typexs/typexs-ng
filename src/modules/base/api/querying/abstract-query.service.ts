import {IQueringService} from './IQueringService';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import {IBuildOptions, IEntityRef, ILookupRegistry, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {Helper} from '../../../../libs/observable/Helper';
import {AuthMessage} from '../../messages/types/AuthMessage';
import {BackendClientService} from '../../backend-client.service';
import {AuthService} from '../auth/auth.service';
import {IFindOptions, ISaveOptions} from '@typexs/base/browser';
import {Expressions} from 'commons-expressions/browser';
import {IApiCallOptions} from '../../lib/http/IApiCallOptions';

/**
 * Options for query service
 */
export interface IQueryServiceOptions {

  urlRegistryMetadata: string;

  /**
   * use :name and :id as placeholder
   */
  urlGetEntity: string;

  /**
   * use :name and :id as placeholder
   */
  urlSaveEntity: string;

  /**
   * use :name and :id as placeholder
   */
  urlDeleteEntity: string;

  /**
   * use :name and :id as placeholder
   */
  urlUpdateEntity: string;

  /**
   * use :name and :id as placeholder
   */
  urlQueryEntity: string;

  /**
   * define default route in ng
   */
  ngRoutePrefix: string;

  /**
   * Name of the registry
   */
  registryName: string;
}


export abstract class AbstractQueryService implements IQueringService {

  protected $isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _registry: ILookupRegistry;

  private _http: BackendClientService;

  private _authService: AuthService;

  private entityRefs: IEntityRef[] = [];

  private options: IQueryServiceOptions;


  constructor(http: BackendClientService,
              authService: AuthService,
              registry: ILookupRegistry,
              options: IQueryServiceOptions) {
    this._registry = registry;
    this._http = http;
    this._authService = authService;
    this.options = options;
    this.reloadMetadata();

  }

  getRegistry() {
    return this._registry;
  }

  getEntityRefForName(name: string): IEntityRef {
    return LookupRegistry.$(this.options.registryName).find(XS_TYPE_ENTITY, (e: IEntityRef) => {
      return e.machineName === _.snakeCase(name);
    });
  }


  /**
   * checks if metadata model is ready to be used
   */
  isReady(): Observable<boolean> ;
  isReady(callback: Function): void ;
  isReady(callback?: Function): Observable<boolean> | void {
    if (!callback) {
      return this.$isReady.asObservable();
    } else {
      if (this.$isReady.getValue()) {
        callback();
      }
      this.$isReady.asObservable().subscribe(value => {
        if (_.isBoolean(value)) {
          callback(value);
        }
      }, error => {
        callback(null, error);
      }, () => {
        // callback();
      });
    }
  }

  reloadMetadata() {
    Helper.after(this._authService.isInitialized(), x => {
      if (x) {
        this._authService.getChannel().subscribe(s => {
          if (s instanceof AuthMessage) {
            this.userState();
          }
        });
      }
    });
  }


  userState() {
    if (this._authService.isLoggedIn()) {
      // TODO load for use permissions
      this.loadEntityMetadata();
    } else {
      this.$isReady.next(false);
      this.entityRefs = [];
    }
  }


  loadEntityMetadata() {
    if (!this.$isReady.getValue()) {

      const observable = this._http.callApi(this.options.urlRegistryMetadata, {});
      observable.subscribe(
        value => {
          if (_.isArray(value)) {
            this.entityRefs = [];
            value.forEach(entityDefJson => {
              let entity: any = this._registry.getEntityRefFor(entityDefJson.name);
              if (!entity) {
                entity = this._registry.fromJson(entityDefJson);
              }
              this.entityRefs.push(entity);
            });
          }
          this.$isReady.next(true);
        },
        error => {
          this.$isReady.next(false);
        });

    }
  }


  setNgUrlPrefix(prefix: string) {
    this.options.ngRoutePrefix = prefix;
  }

  getNgUrlPrefix() {
    return this.options.ngRoutePrefix;
  }

  getEntityRefs() {
    return this.entityRefs;
  }




  buildOptions?(method: 'get' | 'update' | 'save' | 'delete' | 'query',
                options: any /*IFindOptions*/, buildOptions: IBuildOptions = {}) {
  }

  buildEntity?(method: 'get' | 'update' | 'save' | 'delete' | 'query',
               entityRef: IEntityRef, entity: any | any[], buildOptions: IBuildOptions = {}) {
  }


  get(entityName: string, entityId: any, options: IFindOptions = {}) {
    const entityDef = this.getEntityRefForName(entityName);
    // const obs = new BehaviorSubject<any>(null);
    const apiParams = {name: entityName, id: entityId};
    const additinalQuery: any = {};
    // let url = this.url(this.options.urlGetEntity, );
    if (!_.isEmpty(options)) {
      // url += '?opts=' + JSON.stringify(options);
      additinalQuery.opts = JSON.stringify(options);
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('get', options, buildOptions);

    return this.callApi(this.options.urlGetEntity, {params: apiParams, query: additinalQuery}, x => {
      return this.buildEntity('get', entityDef, x, buildOptions);
    });
    //
    // const observable = this._http
    //   .callApi();
    // observable.subscribe(
    //   value => {
    //
    //     obs.next(result);
    //     obs.complete();
    //   },
    //   error => {
    //     obs.error(error);
    //     obs.complete();
    //   });
    // this._http.get(url,
    //   (err: Error, res: any) => {
    //     if (err) {
    //       obs.error(err);
    //       obs.complete();
    //     } else if (res) {
    //       const result = this.buildEntity('get', entityDef, res, buildOptions);
    //       obs.next(result);
    //       obs.complete();
    //     }
    //   }
    // );
    // return obs.asObservable();
  }


  query(entityName: string, query: any = null, options: IFindOptions = {}) {
    const _opts = _.clone(options);
    const entityDef = this.getEntityRefForName(entityName);
    // const obs = new BehaviorSubject<any>(null);


    const apiParams = {name: entityName};
    const additinalQuery: any = {};
    // let url = this.url(this.options.urlGetEntity, );

    // const queryParts = [];
    if (_.isPlainObject(query)) {
      additinalQuery.query = query;
      // queryParts.push('query=' + JSON.stringify(query));
    }
    if (_.isNumber(_opts.limit)) {
      additinalQuery.limit = _opts.limit;
      // queryParts.push('limit=' + _opts.limit);
      delete _opts.limit;
    }
    if (_.isNumber(_opts.offset)) {
      additinalQuery.offset = _opts.offset;
      // queryParts.push('offset=' + _opts.offset);
      delete _opts.offset;
    }
    if (_.isPlainObject(_opts.sort)) {
      additinalQuery.sort = _opts.sort;
      // queryParts.push('sort=' + JSON.stringify(_opts.sort));
      delete _opts.sort;
    }

    if (!_.isEmpty(_opts)) {
      additinalQuery.opts = _opts;
      // queryParts.push('opts=' + JSON.stringify(_opts));
    }

    // let url = this.url(this.options.urlQueryEntity, {name: entityName});
    // if (queryParts.length > 0) {
    //   url += '?' + queryParts.join('&');
    // }

    const buildOptions: IBuildOptions = {};
    this.buildOptions('query', options, buildOptions);

    return this.callApi(this.options.urlQueryEntity, {params: apiParams, query: additinalQuery}, x => {
      x.entities = this.buildEntity('query', entityDef, x.entities, buildOptions);
      return x;
    });

    //
    // this._http.get(url, (err: Error, res: any) => {
    //   if (err) {
    //     obs.error(err);
    //     obs.complete();
    //   } else if (res) {
    //     res.entities = this.buildEntity('query', entityDef, res.entities, buildOptions);
    //     obs.next(res);
    //     obs.complete();
    //   }
    // });
    // return obs.asObservable();
  }


  save(entityName: string, entity: any, options: ISaveOptions = {}): Observable<any> {
    const entityDef = this.getEntityRefForName(entityName);
    // const obs = new BehaviorSubject<any>(null);
    //
    //
    // const buildOptions: IBuildOptions = {};
    // this.buildOptions('save', options, buildOptions);
    // let url = this.url(this.options.urlSaveEntity, {name: entityName});
    // if (!_.isEmpty(options)) {
    //   url += '?opts=' + JSON.stringify(options);
    // }


    const apiParams = {name: entityName};
    const additinalQuery: any = {};
    // let url = this.url(this.options.urlGetEntity, );
    if (!_.isEmpty(options)) {
      // url += '?opts=' + JSON.stringify(options);
      additinalQuery.opts = options;
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('save', options, buildOptions);

    return this.callApi(this.options.urlSaveEntity, {params: apiParams, query: additinalQuery, content: entity}, x => {
      return this.buildEntity('save', entityDef, x, buildOptions);
    });
    //
    //
    // this._http.post(url, entity, (err: Error, res: any) => {
    //   if (err) {
    //     obs.error(err);
    //     obs.complete();
    //   } else if (res) {
    //     const result = this.buildEntity('save', entityDef, res, buildOptions);
    //     obs.next(result);
    //     obs.complete();
    //   }
    // });
    // return obs.asObservable();
  }

  /**
   * Two usage variants
   * 1. update only one entity
   * 2. update a mass of entities defined by entityId or query conditions with given values
   *
   * @param entityName
   * @param entityId
   * @param entity
   * @param options
   */
  update(entityName: string, entityId: any, entity: any, options: ISaveOptions = {}) {
    // TODO if empty entity ???
    const entityDef = this.getEntityRefForName(entityName);
    const id = Expressions.buildLookupConditions(entityDef, entity);
    if (entityId !== id) {
      throw new Error('something is wrong');
    }
    // const obs = new BehaviorSubject<any>(null);
    // let url = this.url(this.options.urlUpdateEntity, {name: entityName, id: entityId});
    //
    //
    // const buildOptions: IBuildOptions = {};
    // this.buildOptions('update', options, buildOptions);
    // if (!_.isEmpty(options)) {
    //   url += '?opts=' + JSON.stringify(options);
    // }

    const apiParams = {name: entityName, id: entityId};
    const additinalQuery: any = {};
    // let url = this.url(this.options.urlGetEntity, );
    if (!_.isEmpty(options)) {
      // url += '?opts=' + JSON.stringify(options);
      additinalQuery.opts = options;
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('update', options, buildOptions);

    return this.callApi(this.options.urlSaveEntity, {params: apiParams, query: additinalQuery, content: entity}, x => {
      return this.buildEntity('update', entityDef, x, buildOptions);
    });

    // this._http.post(url, entity, (err: Error, res: any) => {
    //   if (err) {
    //     obs.error(err);
    //     obs.complete();
    //   } else if (res) {
    //     const result = this.buildEntity('update', entityDef, res, buildOptions);
    //     obs.next(result);
    //     obs.complete();
    //   }
    // });
    // return obs.asObservable();
  }


  delete(entityName: string, entityId: any, options: any = {}) {
    const entityDef = this.getEntityRefForName(entityName);
    // const obs = new BehaviorSubject<any>(null);
    // let url = this.url(this.options.urlDeleteEntity, {name: entityName, id: entityId});
    //
    //
    // const buildOptions: IBuildOptions = {};
    // this.buildOptions('delete', options, buildOptions);
    // if (!_.isEmpty(options)) {
    //   url += '?opts=' + JSON.stringify(options);
    // }


    const apiParams = {name: entityName, id: entityId};
    const additinalQuery: any = {};
    // let url = this.url(this.options.urlGetEntity, );
    if (!_.isEmpty(options)) {
      // url += '?opts=' + JSON.stringify(options);
      additinalQuery.opts = options;
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('delete', options, buildOptions);

    return this.callApi(this.options.urlDeleteEntity, {params: apiParams, query: additinalQuery}, x => {
      return this.buildEntity('delete', entityDef, x, buildOptions);
    });

    // this._http.delete(url, (err: Error, res: any) => {
    //   if (err) {
    //     obs.error(err);
    //     obs.complete();
    //   } else {
    //     const result = this.buildEntity('delete', entityDef, res, buildOptions);
    //     obs.next(result);
    //     obs.complete();
    //   }
    // });
    // return obs.asObservable();
  }

  callApi(context: string, api: IApiCallOptions, resultHandle?: (x: any) => any) {
    const obs = new BehaviorSubject<any>(null);
    const observable = this._http
      .callApi(context, api);
    observable.subscribe(
      value => {
        if (resultHandle) {
          const result = resultHandle(value);
          obs.next(result);
        } else {
          obs.next(value);
        }
        obs.complete();
      },
      error => {
        obs.error(error);
        obs.complete();
      });
    return obs.asObservable();
  }

}
