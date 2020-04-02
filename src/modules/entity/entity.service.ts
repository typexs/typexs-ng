import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {IFindOptions} from '@typexs/schema/libs/framework/IFindOptions';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {EntityRef} from '@typexs/schema/libs/registry/EntityRef';
import {AuthService} from '../system/api/auth/auth.service';
import {HttpClientWrapper} from '../system/http-client-wrapper.service';
import {IQueringService} from '../system/api/querying/IQueringService';
import {AbstractQueryService} from '../system/api/querying/abstract-query.service';
import {
  API_ENTITY_DELETE_ENTITY,
  API_ENTITY_FIND_ENTITY,
  API_ENTITY_GET_ENTITY,
  API_ENTITY_METADATA_ALL_ENTITIES,
  API_ENTITY_PREFIX,
  API_ENTITY_SAVE_ENTITY,
  API_ENTITY_UPDATE_ENTITY
} from '@typexs/schema/browser';


@Injectable()
export class EntityService  extends AbstractQueryService implements IQueringService  {

  constructor(private http: HttpClientWrapper, private authService: AuthService) {
    super(http, authService, EntityRegistry.$(), {
      ngRoutePrefix: API_ENTITY_PREFIX,
      urlRegistryMetadata: 'api' + API_ENTITY_PREFIX + API_ENTITY_METADATA_ALL_ENTITIES,
      urlUpdateEntity: '',
      urlSaveEntity: '',
      urlDeleteEntity: '',
      urlQueryEntity: '',
      urlGetEntity: null,
      registryName: 'default'
    });
  }


  // private _ready = false;

  // private prefix = '/entity';


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


  get(entityName: string, entityId: any) {
    const entityDef = EntityRegistry.$().getEntityRefByName(entityName);
    const obs = new BehaviorSubject<any>(null);
    this.http.get(
      'api' + API_ENTITY_PREFIX + API_ENTITY_GET_ENTITY.replace(':name', entityName).replace(':id', entityId),
      // 'api/entity/' + entityName + '/' + entityId,
      (err: Error, res: any) => {
        if (err) {
          obs.error(err);
          obs.complete();
        } else if (res) {
          const result = EntityService._buildEntity(entityDef, res);
          obs.next(result);
          obs.complete();
        }
      }
    );
    return obs.asObservable();
  }


  query(entityName: string, query: any = null, options: IFindOptions = {}) {
    const entityDef = EntityRegistry.$().getEntityRefByName(entityName);
    const obs = new BehaviorSubject<any>(null);
    const queryParts = [];
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

    // let url = 'api/entity/' + entityName;
    let url = 'api' + API_ENTITY_PREFIX + API_ENTITY_FIND_ENTITY.replace(':name', entityName);
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
    const entityDef = EntityRegistry.$().getEntityRefByName(entityName);
    const obs = new BehaviorSubject<any>(null);
    const url = 'api' + API_ENTITY_PREFIX + API_ENTITY_SAVE_ENTITY.replace(':name', entityName);
    this.http.post(url, entity, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        const result = EntityService._buildEntity(entityDef, res);
        obs.next(result);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  update(entityName: string, entityId: any, entity: any) {
    // TODO if empty entity ???
    const entityDef = EntityRegistry.$().getEntityRefByName(entityName);
    const id = entityDef.buildLookupConditions(entity);
    if (entityId !== id) {
      throw new Error('something is wrong');
    }
    const obs = new BehaviorSubject<any>(null);
    const url = 'api' + API_ENTITY_PREFIX + API_ENTITY_UPDATE_ENTITY
      .replace(':name', entityName)
      .replace(':id', entityId);
    this.http.post(url, entity, (err: Error, res: any) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else if (res) {
        const result = EntityService._buildEntity(entityDef, res);
        obs.next(result);
        obs.complete();
      }
    });
    return obs.asObservable();
  }


  delete(entityName: string, entityId: any) {
    const entityDef = EntityRegistry.$().getEntityRefByName(entityName);
    const obs = new BehaviorSubject<any>(null);
    const url = 'api' + API_ENTITY_PREFIX + API_ENTITY_DELETE_ENTITY
      .replace(':name', entityName)
      .replace(':id', entityId);
    this.http.delete(url,
      (err: Error, res: any) => {
        if (err) {
          obs.error(err);
          obs.complete();
        } else {
          const result = EntityService._buildEntity(entityDef, res);
          obs.next(result);
          obs.complete();
        }
      });
    return obs.asObservable();
  }
}
