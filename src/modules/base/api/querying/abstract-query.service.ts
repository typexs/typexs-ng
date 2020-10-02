import {IQueringService} from './IQueringService';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import {IBuildOptions, IEntityRef, IEntityRefMetadata, ILookupRegistry, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {BackendClientService, IRoutePointer} from '../../backend-client.service';
import {AuthService} from '../auth/auth.service';
import {IFindOptions, ISaveOptions} from '@typexs/base/browser';
import {Expressions} from 'commons-expressions/browser';
import {IApiCallOptions} from '../../lib/http/IApiCallOptions';
import {of, Subscription} from 'rxjs';
import {STORAGE_REQUEST_MODE} from './Constants';
import {IUpdateOptions} from '@typexs/base/libs/storage/framework/IUpdateOptions';
import {IAggregateOptions} from '@typexs/base/libs/storage/framework/IAggregateOptions';
import {Log} from '../../lib/log/Log';

/**
 * Options for query service
 */
export interface IQueryServiceOptions {

  routes: { [k in STORAGE_REQUEST_MODE]: string | IRoutePointer };

  /**
   * define default route in ng
   */
  ngRoutePrefix: string;

  /**
   * Name of the registry
   */
  registryName?: string;

  /**
   * Registry handler from type ILookupRegistry
   */
  registry?: ILookupRegistry;
}


export abstract class AbstractQueryService implements IQueringService {

  protected $isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _http: BackendClientService;

  private _authService: AuthService;

  private entityRefs: IEntityRef[] = [];

  private options: IQueryServiceOptions;


  constructor(http: BackendClientService,
              authService: AuthService,
              options: IQueryServiceOptions) {
    // this._registry = registry;
    this._http = http;
    this._authService = authService;
    this.options = options;
    this.initialize();

  }

  isSupported(type: STORAGE_REQUEST_MODE) {
    return !!this.options.routes[type];
  }


  getRoute(type: STORAGE_REQUEST_MODE): IRoutePointer {
    const route = this.options.routes[type];
    if (_.isString(route)) {
      const _route: IRoutePointer = {
        route: route,
        method: 'get'
      };
      switch (type) {
        case 'delete':
        case 'delete_by_condition':
          _route.method = 'delete';
          break;
        case 'update':
        case 'save':
          _route.method = 'post';
          break;
        case 'update_by_condition':
          _route.method = 'put';
          break;
      }
      return _route;
    } else {
      return route;
    }

  }

  private initialize() {
    if (this._authService.isEnabled()) {
      let subscription: Subscription = null;
      this._authService.isInitialized().subscribe(x => {
        if (x) {
          subscription = this._authService.isLoggedIn().subscribe(isLoggedIn => {
            if (isLoggedIn) {
              this.loadEntityMetadata();
            } else {
              this.$isReady.next(false);
              this.entityRefs = [];
            }
          });
        } else {
          if (subscription) {
            subscription.unsubscribe();
            this.$isReady.next(false);
            this.entityRefs = [];
          }
        }
      });
    } else {
      this.loadEntityMetadata();
    }
  }

  getRegistry() {
    if (this.options.registry) {
      return this.options.registry;
    }
    throw new Error('registry not supported for this service.');
  }

  /**
   * return the Entity describing reference or null if not present
   * @param name
   */
  getEntityRefForName(name: string): IEntityRef {
    if (!this.options.registryName) {
      return null;
    }
    return LookupRegistry.$(this.options.registryName)
      .find(XS_TYPE_ENTITY, (e: IEntityRef) => {
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


  loadEntityMetadata() {
    if (!this.isSupported('metadata')) {
      Log.warn('loading metadata for ' + this.options.ngRoutePrefix + ' is not supported');
      this.$isReady.next(true);
      return;
    }
    if (!this.$isReady.getValue()) {
      const observable = this._http.callApi<IEntityRefMetadata[]>(this.getRoute('metadata'), {});
      observable.subscribe(
        value => {
          if (_.isArray(value)) {
            this.entityRefs = [];
            value.forEach(entityDefJson => {
              let entity: any = this.getRegistry().getEntityRefFor(entityDefJson.name);
              if (!entity) {
                entity = this.getRegistry().fromJson(entityDefJson);
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


  buildOptions?(method: STORAGE_REQUEST_MODE,
                options: any /*IFindOptions*/, buildOptions: IBuildOptions = {}) {
  }

  buildEntity?(method: STORAGE_REQUEST_MODE,
               entityRef: IEntityRef, entity: any | any[], buildOptions: IBuildOptions = {}) {
    return entity;
  }


  /**
   * TODO
   * @param entityName
   * @param entityId
   * @param options
   */
  get(entityName: string, entityId: any, options: IFindOptions = {}) {
    if (!this.options.routes.get) {
      throw new Error('Url for getting a single entity is missing.');
    }
    const entityDef = this.getEntityRefForName(entityName);
    // const obs = new BehaviorSubject<any>(null);
    const apiParams = {name: entityName, id: entityId};
    const additinalQuery: any = {};
    // let apiUrl = this.apiUrl(this.options.urlGetEntity, );
    if (!_.isEmpty(options)) {
      // apiUrl += '?opts=' + JSON.stringify(options);
      additinalQuery.opts = JSON.stringify(options);
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('get', options, buildOptions);

    return this.callApi(this.getRoute('get'), {params: apiParams, query: additinalQuery}, x => {
      return this.buildEntity('get', entityDef, x, buildOptions);
    });
  }


  /**
   * Return results for an query request to the backend
   *
   * @param entityName
   * @param query
   * @param options
   */
  query(entityName: string, query: any = null, options: IFindOptions = {}) {
    if (!this.isSupported('query')) {
      throw new Error('Url for querying entities is missing.');
    }
    return this._query(entityName, query, null, options);
  }


  /**
   * Return results of an aggregation request to the backend
   *
   * @param entityName
   * @param aggr
   * @param options
   */
  aggregate(entityName: string, aggr: any = [], options: IAggregateOptions = {}) {
    if (!this.isSupported('aggregate')) {
      throw new Error('Url for aggregating entities is missing.');
    }
    return this._query(entityName, null, aggr, options);
  }


  /**
   * Generic method for execution of query or aggregation request
   *
   * @param entityName
   * @param query
   * @param options
   */
  private _query(entityName: string, query: any = null, aggr: any = null, options: IFindOptions = {}) {
    const _opts = _.clone(options);
    const entityDef = this.getEntityRefForName(entityName);
    const apiParams = {name: entityName};
    const additinalQuery: any = {};
    let aggrMode = false;
    if (_.isPlainObject(query)) {
      additinalQuery.query = query;
    } else if (_.isPlainObject(aggr) || _.isArray(aggr)) {
      additinalQuery.aggr = aggr;
      aggrMode = true;
    } else {
      if (aggr) {
        return of({entities: [], $count: 0, $limit: 0, $offset: 0});
      }
    }
    if (_.isNumber(_opts.limit)) {
      additinalQuery.limit = _opts.limit;
      delete _opts.limit;
    }
    if (_.isNumber(_opts.offset)) {
      additinalQuery.offset = _opts.offset;
      delete _opts.offset;
    }
    if (_.isPlainObject(_opts.sort)) {
      additinalQuery.sort = _opts.sort;
      delete _opts.sort;
    }
    if (!_.isEmpty(_opts)) {
      additinalQuery.opts = _opts;
    }
    const mode = aggrMode ? 'aggregate' : 'query';
    const buildOptions: IBuildOptions = {};
    this.buildOptions(mode, options, buildOptions);

    const apiOptions = {params: apiParams, query: additinalQuery};
    return this.callApi(this.getRoute(aggrMode ? 'aggregate' : 'query'), apiOptions, x => {
      x.entities = this.buildEntity(mode, entityDef, x.entities, buildOptions);
      return x;
    });
  }

  save(entityName: string, entity: any, options: ISaveOptions = {}): Observable<any> {
    if (!this.isSupported('save')) {
      throw new Error('Url for saving entities is missing.');
    }
    const entityDef = this.getEntityRefForName(entityName);
    const apiParams = {name: entityName};
    const additinalQuery: any = {};
    if (!_.isEmpty(options)) {
      additinalQuery.opts = options;
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('save', options, buildOptions);

    return this.callApi(this.getRoute('save'), {params: apiParams, query: additinalQuery, content: entity}, x => {
      return this.buildEntity('save', entityDef, x, buildOptions);
    });
  }

  /**
   * Two usage variants
   * 1. update only one entity
   * 2. TODO ! update a mass of entities defined by entityId or query conditions with given values
   *
   * @param entityName
   * @param entityId
   * @param entity
   * @param options
   */
  update(entityName: string, entityId: any, entity: any, options: IUpdateOptions = {}) {
    if (!this.isSupported('update')) {
      throw new Error('Url for update entities is missing.');
    }
    // TODO if empty entity ???
    const entityDef = this.getEntityRefForName(entityName);
    const id = Expressions.buildLookupConditions(entityDef, entity);
    if (entityId !== id) {
      throw new Error('something is wrong');
    }

    const apiParams = {name: entityName, id: entityId};
    const additinalQuery: any = {};
    if (!_.isEmpty(options)) {
      additinalQuery.opts = options;
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('update', options, buildOptions);

    return this.callApi(this.getRoute('update'), {
      params: apiParams,
      query: additinalQuery, content: entity
    }, x => {
      return this.buildEntity('update', entityDef, x, buildOptions);
    });
  }

  /**
   * Two usage variants
   * 1. update only one entity
   * 2. TODO ! update a mass of entities defined by entityId or query conditions with given values
   *
   * @param entityName
   * @param entityId
   * @param entity
   * @param options
   */
  updateByCondition(entityName: string, condition: any, update: any, options: ISaveOptions = {}) {
    if (!this.isSupported('update_by_condition')) {
      throw new Error('Url for update by conditions is missing.');
    }
    // TODO if empty entity ???
    const entityDef = this.getEntityRefForName(entityName);

    if (!update) {
      throw new Error('Something is wrong.');
    }

    if (!condition) {
      throw new Error('Something is wrong.');
    }

    const apiParams = {name: entityName};
    const additinalQuery: any = {
      query: condition
    };
    if (!_.isEmpty(options)) {
      additinalQuery.opts = options;
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('update', options, buildOptions);

    return this.callApi(this.getRoute('update_by_condition'), {params: apiParams, query: additinalQuery, content: update}, x => {
      return this.buildEntity('update', entityDef, x, buildOptions);
    });
  }

  /**
   * TODO
   * - mass delete
   * @param entityName
   * @param entityId
   * @param options
   */
  delete(entityName: string, entityId: any, options: any = {}) {
    if (!this.isSupported('delete')) {
      throw new Error('Url for delete entities is missing.');
    }
    const entityDef = this.getEntityRefForName(entityName);
    const apiParams = {name: entityName, id: entityId};
    const additinalQuery: any = {};
    if (!_.isEmpty(options)) {
      additinalQuery.opts = options;
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('delete', options, buildOptions);

    return this.callApi(this.getRoute('delete'), {params: apiParams, query: additinalQuery}, x => {
      return this.buildEntity('delete', entityDef, x, buildOptions);
    });
  }

  /**
   * TODO
   * - mass delete
   * @param entityName
   * @param entityId
   * @param options
   */
  deleteByCondition(entityName: string, condition: any, options: any = {}) {
    if (!this.isSupported('delete_by_condition')) {
      throw new Error('Url for delete by condition is missing.');
    }
    if (!condition) {
      throw new Error('Condition not found');
    }


    const entityDef = this.getEntityRefForName(entityName);
    const apiParams = {name: entityName};
    const additinalQuery: any = {
      query: condition
    };
    if (!_.isEmpty(options)) {
      additinalQuery.opts = options;
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('delete', options, buildOptions);

    return this.callApi(this.getRoute('update_by_condition'), {params: apiParams, query: additinalQuery}, x => {
      return this.buildEntity('delete', entityDef, x, buildOptions);
    });
  }


  callApi(context: string | IRoutePointer, api: IApiCallOptions, resultHandle?: (x: any) => any) {
    const obs = new BehaviorSubject<any>(null);
    const observable = this._http.callApi(context, api);
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
