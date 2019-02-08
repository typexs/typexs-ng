import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {IFindOptions} from '@typexs/schema/libs/framework/IFindOptions';
import {AuthService} from '../system/api/auth/auth.service';
import {HttpClientWrapper} from '../system/http-client-wrapper.service';
import {
  API_STORAGE_DELETE_ENTITY,
  API_STORAGE_FIND_ENTITY,
  API_STORAGE_GET_ENTITY,
  API_STORAGE_METADATA_ALL_ENTITIES, API_STORAGE_METADATA_ALL_STORES,
  API_STORAGE_PREFIX,
  API_STORAGE_SAVE_ENTITY, API_STORAGE_UPDATE_ENTITY, IStorageRefMetadata
} from '@typexs/server/browser';
import {REGISTRY_TYPEORM, TypeOrmEntityRegistry} from '@typexs/base/browser';
import {IEntityRef, ILookupRegistry, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {Expressions} from 'commons-expressions/browser';
import {Subject} from 'rxjs/Subject';
import {AuthMessage} from '../system/messages/types/AuthMessage';
import {Helper} from '../../libs/observable/Helper';


@Injectable()
export class StorageService {

  private registry: ILookupRegistry = null;//TypeOrmEntityRegistry.$();

  private entityDefs: IEntityRef[] = [];

  private _isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _ready: boolean = false;

  private prefix: string = '/storage';

  constructor(private http: HttpClientWrapper, private authService: AuthService) {
    this.registry = TypeOrmEntityRegistry.$();
    this.reloadMetadata();
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
              let entity:any = TypeOrmEntityRegistry.$().getEntityRefByName(entityDefJson.name);
              if(!entity){
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
    let obs = new Subject<IStorageRefMetadata[]>();
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
      return e.machineName == _.snakeCase(name);
    });
  }

  getEntityRefs() {
    return this.entityDefs;
  }


  get(entityName: string, entityId: any) {
    let entityDef = this.getEntityRefForName(entityName);
    let obs = new BehaviorSubject<any>(null);
    this.http.get(this.url(API_STORAGE_GET_ENTITY, {name: entityName, id: entityId}),
      (err: Error, res: any) => {
        if (err) {
          obs.error(err);
          obs.complete();
        } else if (res) {
          let result = StorageService._buildEntity(entityDef, res);
          obs.next(result);
          obs.complete();
        }
      }
    );
    return obs.asObservable();
  }


  query(entityName: string, query: any = null, options: IFindOptions = {}) {
    let entityDef = this.getEntityRefForName(entityName);
    let obs = new BehaviorSubject<any>(null);
    let queryParts = [];
    if (_.isPlainObject(query)) {
      queryParts.push('query=' + JSON.stringify(query));
    }
    if (_.isNumber(options.limit)) {
      queryParts.push('limit=' + options.limit);
    }
    if (_.isNumber(options.offset)) {
      queryParts.push('offset=' + options.offset);
    }
    if (_.isPlainObject(options.sort)) {
      queryParts.push('sort=' + JSON.stringify(options.sort));
    }

    let url = this.url(API_STORAGE_FIND_ENTITY, {name: entityName});
    if (queryParts.length > 0) {
      url += '?' + queryParts.join('&');
    }

    this.http.get(url, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        res.entities = StorageService._buildEntity(entityDef, res.entities);
        obs.next(res);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  save(entityName: string, entity: any): Observable<any> {
    let entityDef = this.getEntityRefForName(entityName);
    let obs = new BehaviorSubject<any>(null);
    this.http.post(this.url(API_STORAGE_SAVE_ENTITY, {name: entityName}), entity, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        let result = StorageService._buildEntity(entityDef, res);
        obs.next(result);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  update(entityName: string, entityId: any, entity: any) {
    // TODO if empty entity ???
    let entityDef = this.getEntityRefForName(entityName);
    let id = Expressions.buildLookupConditions(entityDef, entity);
    if (entityId != id) {
      throw new Error('something is wrong');
    }
    let obs = new BehaviorSubject<any>(null);
    const url = this.url(API_STORAGE_UPDATE_ENTITY, {name: entityName, id: entityId});
    this.http.post(url, entity, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        let result = StorageService._buildEntity(entityDef, res);
        obs.next(result);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  delete(entityName: string, entityId: any) {
    let entityDef = this.getEntityRefForName(entityName);
    let obs = new BehaviorSubject<any>(null);
    const url = this.url(API_STORAGE_DELETE_ENTITY, {name: entityName, id: entityId});
    this.http.delete(url, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else {
        let result = StorageService._buildEntity(entityDef, res);
        obs.next(result);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  private static _beforeBuild(entityDef: IEntityRef, from: any, to: any) {
    _.keys(from).filter(k => k.startsWith('$')).forEach(k => {
      to[k] = from[k];
    });
  }


  private static _buildEntitySingle(entityDef: IEntityRef, entity: any) {
    return entityDef.build(entity, {
      beforeBuild: StorageService._beforeBuild
    });
  }

  private static _buildEntity(entityDef: IEntityRef, rawEntities: any | any[]) {

    let result = null;
    if (_.isArray(rawEntities)) {
      result = rawEntities.map(r => StorageService._buildEntitySingle(entityDef, r));
    } else {
      result = StorageService._buildEntitySingle(entityDef, rawEntities);
    }

    return result;
  }
}
