import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {IFindOptions} from '@typexs/schema/libs/framework/IFindOptions';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {EntityRef} from '@typexs/schema/libs/registry/EntityRef';
import {AuthService} from '../system/api/auth/auth.service';
import {HttpClientWrapper} from '../system/http-client-wrapper.service';
import {AuthMessage} from '../system/messages/types/AuthMessage';
import {Helper} from '../../libs/observable/Helper';


@Injectable()
export class EntityService {

  private entityDefs: EntityRef[] = [];

  private _isReady: Subject<boolean> = new Subject<boolean>();

  private _ready: boolean = false;

  private prefix: string = '/entity';

  constructor(private http: HttpClientWrapper, private authService: AuthService) {
    this.reloadMetadata();
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
      this.entityDefs = [];
    }
  }


  loadEntityMetadata() {
    this._ready = false;
    this.http.get('api/metadata/entities',
      (err: Error, entities: Object) => {
        if (_.isArray(entities)) {
          this.entityDefs = [];
          entities.forEach(entityDefJson => {
            let ed = EntityRegistry.fromJson(entityDefJson);
            this.entityDefs.push(ed);
          });
        }
        this._isReady.complete();
        this._ready = true;
      });
  }


  getEntityRefs() {
    return this.entityDefs;
  }


  get(entityName: string, entityId: any) {
    let entityDef = EntityRegistry.$().getEntityRefByName(entityName);
    let obs = new BehaviorSubject<any>(null);
    this.http.get('api/entity/' + entityName + '/' + entityId,
      (err: Error, res: any) => {
        if (err) {
          obs.error(err);
          obs.complete();
        } else if (res) {
          let result = EntityService._buildEntity(entityDef, res);
          obs.next(result);
          obs.complete();
        }
      }
    );
    return obs.asObservable();
  }


  query(entityName: string, query: any = null, options: IFindOptions = {}) {
    let entityDef = EntityRegistry.$().getEntityRefByName(entityName);
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

    let url = 'api/entity/' + entityName;
    if (queryParts.length > 0) {
      url += '?' + queryParts.join('&');
    }

    this.http.get(url, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        res.entities = EntityService._buildEntity(entityDef, res.entities);
        obs.next(res);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  save(entityName: string, entity: any): Observable<any> {
    let entityDef = EntityRegistry.$().getEntityRefByName(entityName);
    let obs = new BehaviorSubject<any>(null);
    this.http.post('api/entity/' + entityName, entity, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        let result = EntityService._buildEntity(entityDef, res);
        obs.next(result);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  update(entityName: string, entityId: any, entity: any) {
    // TODO if empty entity ???
    let entityDef = EntityRegistry.$().getEntityRefByName(entityName);
    let id = entityDef.buildLookupConditions(entity);
    if (entityId != id) {
      throw new Error('something is wrong');
    }
    let obs = new BehaviorSubject<any>(null);
    this.http.post('api/entity/' + entityName + '/' + entityId, entity, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        let result = EntityService._buildEntity(entityDef, res);
        obs.next(result);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  delete(entityName: string, entityId: any) {
    let entityDef = EntityRegistry.$().getEntityRefByName(entityName);
    let obs = new BehaviorSubject<any>(null);
    this.http.delete('api/entity/' + entityName + '/' + entityId,
      (err: Error, res: any) => {
        if (err) {
          obs.error(err);
          obs.complete();
        } else {
          let result = EntityService._buildEntity(entityDef, res);
          obs.next(result);
          obs.complete();
        }
      });
    return obs.asObservable();
  }


  private static _beforeBuild(entityDef: EntityRef, from: any, to: any) {
    _.keys(from).filter(k => k.startsWith('$')).forEach(k => {
      to[k] = from[k];
    });
  }


  private static _buildEntitySingle(entityDef: EntityRef, entity: any) {
    return entityDef.build(entity, {
      beforeBuild: EntityService._beforeBuild
    });
  }

  private static _buildEntity(entityDef: EntityRef, rawEntities: any | any[]) {

    let result = null;
    if (_.isArray(rawEntities)) {
      result = rawEntities.map(r => EntityService._buildEntitySingle(entityDef, r));
    } else {
      result = EntityService._buildEntitySingle(entityDef, rawEntities);
    }

    return result;
  }
}
