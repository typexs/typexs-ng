import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../system/api/auth/auth.service';
import {HttpClientWrapper} from '../system/http-client-wrapper.service';
import {
  API_STORAGE_DELETE_ENTITY,
  API_STORAGE_FIND_ENTITY,
  API_STORAGE_GET_ENTITY,
  API_STORAGE_METADATA_ALL_ENTITIES,
  API_STORAGE_METADATA_ALL_STORES,
  API_STORAGE_PREFIX,
  API_STORAGE_SAVE_ENTITY,
  API_STORAGE_UPDATE_ENTITY,
  IStorageRefMetadata
} from '@typexs/server/browser';
import {IFindOptions, ISaveOptions, REGISTRY_TYPEORM, TypeOrmEntityRegistry} from '@typexs/base/browser';
import {IBuildOptions, IEntityRef, ILookupRegistry, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {Expressions} from 'commons-expressions/browser';
import {Subject} from 'rxjs/Subject';
import {AuthMessage} from '../system/messages/types/AuthMessage';
import {Helper} from '../../libs/observable/Helper';
import {IQueringService} from '../system/api/querying/IQueringService';


@Injectable()
export class StorageService implements IQueringService {

  constructor(private http: HttpClientWrapper, private authService: AuthService) {
    this.registry = TypeOrmEntityRegistry.$();
    this.reloadMetadata();
  }

  private registry: ILookupRegistry = null; // TypeOrmEntityRegistry.$();

  private entityDefs: IEntityRef[] = [];

  private _isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _ready = false;

  private prefix = '/storage';


  private static _beforeBuild(entityDef: IEntityRef, from: any, to: any) {
    _.keys(from).filter(k => k.startsWith('$')).forEach(k => {
      to[k] = from[k];
    });
  }

  private static _beforeBuildRaw(entityDef: IEntityRef, from: any, to: any) {
    _.keys(from).filter(k => !k.startsWith('$')).forEach(k => {
      to[k] = from[k];
    });
  }

  /**
   * Postprocess retrieved entity by declared build options. By default the build copy "$"
   * starting members and pass only members by entity schema definition.
   *
   * - supports "raw" find option to by pass schema filter
   * - with "skipBuilds" the build process can be overruled
   *
   *
   * @param entityDef
   * @param entity
   * @param options
   * @private
   */
  private static _buildEntitySingle(entityDef: IEntityRef, entity: any, options?: IBuildOptions) {
    if (_.get(options, 'skipBuilds', false)) {
      const x = entityDef.create();
      _.assign(x, entity);
      return x;
    }
    const opts = _.defaults(options, {
      beforeBuild: StorageService._beforeBuild
    });
    if (_.get(options, 'raw', false)) {
      opts.beforeBuild = StorageService._beforeBuildRaw;
    }
    return entityDef.build(entity, opts);
  }

  private static _buildEntity(entityDef: IEntityRef, rawEntities: any | any[], options?: IBuildOptions) {
    let result = null;
    if (_.isArray(rawEntities)) {
      result = rawEntities.map(r => StorageService._buildEntitySingle(entityDef, r, options));
    } else {
      result = StorageService._buildEntitySingle(entityDef, rawEntities, options);
    }
    return result;
  }

  static buildOptions(options: any, buildOptions: any) {
    if (_.get(options, 'raw', false)) {
      _.set(buildOptions, 'raw', options.raw);
    }
  }

  getRegistry() {
    return this.registry;
  }


  setNgUrlPrefix(prefix: string) {
    this.prefix = prefix;
  }


  getNgUrlPrefix() {
    return this.prefix;
  }


  isReady(callback: Function): void {
    if (this._ready) {
      callback();
    }
    this._isReady.asObservable().subscribe(null, null, () => {
      callback();
    });
  }


  url(url: string, replace: any = null) {
    url = 'api' + API_STORAGE_PREFIX + url;
    if (replace) {
      _.keys(replace).forEach(k => {
        url = url.replace(':' + k, replace[k]);
      });
    }
    return url;
  }


  reloadMetadata() {
    Helper.after(this.authService.isInitialized(), x => {
      if (x) {
        this.authService.getChannel().subscribe(s => {
          if (s instanceof AuthMessage) {
            this.userState();
          }
        });
      }
    });
  }


  userState() {
    if (this.authService.isLoggedIn()) {
      // TODO load for use permissions
      this.loadEntityMetadata();
    } else {
      this._ready = false;
      this.entityDefs = [];
    }
  }


  loadEntityMetadata() {
    if (!this._ready) {
      this.http.get(this.url(API_STORAGE_METADATA_ALL_ENTITIES),
        (err: Error, entities: Object) => {
          if (_.isArray(entities)) {
            this.entityDefs = [];
            entities.forEach(entityDefJson => {
              let entity: any = TypeOrmEntityRegistry.$().getEntityRefByName(entityDefJson.name);
              if (!entity) {
                entity = this.registry.fromJson(entityDefJson);
              }
              this.entityDefs.push(entity);
            });
          }
          this._isReady.complete();
          this._ready = true;
        });
    }
  }


  getStorages(): Observable<IStorageRefMetadata[]> {
    const obs = new Subject<IStorageRefMetadata[]>();
    this.http.get(this.url(API_STORAGE_METADATA_ALL_STORES),
      (err: Error, entities: IStorageRefMetadata[]) => {
        if (err) {
          obs.error(err);
          obs.complete();
        } else if (_.isArray(entities)) {
          obs.next(entities);
          obs.complete();
        }
      });
    return obs.asObservable();
  }

  getEntityRefForName(name: string): IEntityRef {
    return LookupRegistry.$(REGISTRY_TYPEORM).find(XS_TYPE_ENTITY, (e: IEntityRef) => {
      return e.machineName === _.snakeCase(name);
    });
  }

  getEntityRefs() {
    return this.entityDefs;
  }


  get(entityName: string, entityId: any, options: IFindOptions = {}) {
    const entityDef = this.getEntityRefForName(entityName);
    const obs = new BehaviorSubject<any>(null);
    let url = this.url(API_STORAGE_GET_ENTITY, {name: entityName, id: entityId});
    if (!_.isEmpty(options)) {
      url += '?opts=' + JSON.stringify(options);
    }
    const buildOptions: IBuildOptions = {};
    StorageService.buildOptions(options, buildOptions);

    this.http.get(url,
      (err: Error, res: any) => {
        if (err) {
          obs.error(err);
          obs.complete();
        } else if (res) {
          const result = StorageService._buildEntity(entityDef, res, buildOptions);
          obs.next(result);
          obs.complete();
        }
      }
    );
    return obs.asObservable();
  }


  query(entityName: string, query: any = null, options: IFindOptions = {}) {
    const _opts = _.clone(options);
    const entityDef = this.getEntityRefForName(entityName);
    const obs = new BehaviorSubject<any>(null);
    const queryParts = [];
    if (_.isPlainObject(query)) {
      queryParts.push('query=' + JSON.stringify(query));
    }
    if (_.isNumber(_opts.limit)) {
      queryParts.push('limit=' + _opts.limit);
      delete _opts.limit;
    }
    if (_.isNumber(_opts.offset)) {
      queryParts.push('offset=' + _opts.offset);
      delete _opts.offset;
    }
    if (_.isPlainObject(_opts.sort)) {
      queryParts.push('sort=' + JSON.stringify(_opts.sort));
      delete _opts.sort;
    }

    if (!_.isEmpty(_opts)) {
      queryParts.push('opts=' + JSON.stringify(_opts));
    }

    let url = this.url(API_STORAGE_FIND_ENTITY, {name: entityName});
    if (queryParts.length > 0) {
      url += '?' + queryParts.join('&');
    }

    const buildOptions: IBuildOptions = {};
    StorageService.buildOptions(options, buildOptions);

    this.http.get(url, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        res.entities = StorageService._buildEntity(entityDef, res.entities, buildOptions);
        obs.next(res);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  save(entityName: string, entity: any, options: ISaveOptions = {}): Observable<any> {
    const entityDef = this.getEntityRefForName(entityName);
    const obs = new BehaviorSubject<any>(null);


    const buildOptions: IBuildOptions = {};
    StorageService.buildOptions(options, buildOptions);
    let url = this.url(API_STORAGE_SAVE_ENTITY, {name: entityName});
    if (!_.isEmpty(options)) {
      url += '?opts=' + JSON.stringify(options);
    }

    this.http.post(url, entity, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        const result = StorageService._buildEntity(entityDef, res, buildOptions);
        obs.next(result);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  update(entityName: string, entityId: any, entity: any, options: ISaveOptions = {}) {
    // TODO if empty entity ???
    const entityDef = this.getEntityRefForName(entityName);
    const id = Expressions.buildLookupConditions(entityDef, entity);
    if (entityId !== id) {
      throw new Error('something is wrong');
    }
    const obs = new BehaviorSubject<any>(null);
    let url = this.url(API_STORAGE_UPDATE_ENTITY, {name: entityName, id: entityId});


    const buildOptions: IBuildOptions = {};
    StorageService.buildOptions(options, buildOptions);
    if (!_.isEmpty(options)) {
      url += '?opts=' + JSON.stringify(options);
    }

    this.http.post(url, entity, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        const result = StorageService._buildEntity(entityDef, res, buildOptions);
        obs.next(result);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  delete(entityName: string, entityId: any, options: any = {}) {
    const entityDef = this.getEntityRefForName(entityName);
    const obs = new BehaviorSubject<any>(null);
    let url = this.url(API_STORAGE_DELETE_ENTITY, {name: entityName, id: entityId});


    const buildOptions: IBuildOptions = {};
    StorageService.buildOptions(options, buildOptions);
    if (!_.isEmpty(options)) {
      url += '?opts=' + JSON.stringify(options);
    }

    this.http.delete(url, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else {
        const result = StorageService._buildEntity(entityDef, res, buildOptions);
        obs.next(result);
        obs.complete();
      }
    });
    return obs.asObservable();
  }
}
