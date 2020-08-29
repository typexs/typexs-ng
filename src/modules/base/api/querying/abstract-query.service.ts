import {IQueringService} from './IQueringService';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import {IBuildOptions, IEntityRef, ILookupRegistry, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {BackendClientService} from '../../backend-client.service';
import {AuthService} from '../auth/auth.service';
import {IFindOptions, ISaveOptions} from '@typexs/base/browser';
import {Expressions} from 'commons-expressions/browser';
import {IApiCallOptions} from '../../lib/http/IApiCallOptions';
import {of, Subscription} from 'rxjs';
import {STORAGE_REQUEST_MODE} from './Constants';

/**
 * Options for query service
 */
export interface IQueryServiceOptions {

  /**
   * Route name for metadata loading
   */
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
    this.initialize();

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


  buildOptions?(method: STORAGE_REQUEST_MODE,
                options: any /*IFindOptions*/, buildOptions: IBuildOptions = {}) {
  }

  buildEntity?(method: STORAGE_REQUEST_MODE,
               entityRef: IEntityRef, entity: any | any[], buildOptions: IBuildOptions = {}) {
  }


  /**
   * TODO
   * @param entityName
   * @param entityId
   * @param options
   */
  get(entityName: string, entityId: any, options: IFindOptions = {}) {
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

    return this.callApi(this.options.urlGetEntity, {params: apiParams, query: additinalQuery}, x => {
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
    return this._query(entityName, query, null, options);
  }


  /**
   * Return results of an aggregation request to the backend
   *
   * @param entityName
   * @param aggr
   * @param options
   */
  aggregate(entityName: string, aggr: any = [], options: IFindOptions = {}) {
    return this._query(entityName, null, aggr, options);
  }


  /**
   * TODO
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
    console.log(apiOptions);
    return this.callApi(this.options.urlQueryEntity, apiOptions, x => {
      // aggregation ?
      console.log(x);


      x.entities = this.buildEntity(mode, entityDef, x.entities, buildOptions);
      return x;
    });
  }

  save(entityName: string, entity: any, options: ISaveOptions = {}): Observable<any> {
    const entityDef = this.getEntityRefForName(entityName);
    const apiParams = {name: entityName};
    const additinalQuery: any = {};
    if (!_.isEmpty(options)) {
      additinalQuery.opts = options;
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('save', options, buildOptions);

    return this.callApi(this.options.urlSaveEntity, {params: apiParams, query: additinalQuery, content: entity}, x => {
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
  update(entityName: string, entityId: any, entity: any, options: ISaveOptions = {}) {
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

    return this.callApi(this.options.urlSaveEntity, {params: apiParams, query: additinalQuery, content: entity}, x => {
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
    const entityDef = this.getEntityRefForName(entityName);
    const apiParams = {name: entityName, id: entityId};
    const additinalQuery: any = {};
    if (!_.isEmpty(options)) {
      additinalQuery.opts = options;
    }
    const buildOptions: IBuildOptions = {};
    this.buildOptions('delete', options, buildOptions);

    return this.callApi(this.options.urlDeleteEntity, {params: apiParams, query: additinalQuery}, x => {
      return this.buildEntity('delete', entityDef, x, buildOptions);
    });
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
