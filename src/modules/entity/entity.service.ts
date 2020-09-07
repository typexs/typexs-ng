import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {EntityRef} from '@typexs/schema/libs/registry/EntityRef';
import {AuthService} from '../base/api/auth/auth.service';
import {BackendClientService} from '../base/backend-client.service';
import {IQueringService} from '../base/api/querying/IQueringService';
import {AbstractQueryService} from '../base/api/querying/abstract-query.service';
import {
  API_CTRL_ENTITY_DELETE_ENTITY,
  API_CTRL_ENTITY_FIND_ENTITY,
  API_CTRL_ENTITY_GET_ENTITY,
  API_CTRL_ENTITY_METADATA_ALL_ENTITIES,
  API_CTRL_ENTITY_SAVE_ENTITY,
  API_CTRL_ENTITY_UPDATE_ENTITY,
  API_ENTITY_PREFIX,
  REGISTRY_TXS_SCHEMA
} from '@typexs/schema/browser';
import {IBuildOptions, IEntityRef} from 'commons-schema-api/browser';
import {STORAGE_REQUEST_MODE} from '../base/api/querying/Constants';


@Injectable()
export class EntityService extends AbstractQueryService implements IQueringService {


  constructor(private http: BackendClientService, private authService: AuthService) {
    super(http, authService, {
      ngRoutePrefix: API_ENTITY_PREFIX,
      routes: {
        metadata: API_CTRL_ENTITY_METADATA_ALL_ENTITIES,
        update: API_CTRL_ENTITY_UPDATE_ENTITY,
        update_by_condition: null,
        save: API_CTRL_ENTITY_SAVE_ENTITY,
        delete: API_CTRL_ENTITY_DELETE_ENTITY,
        delete_by_condition: null,
        query: API_CTRL_ENTITY_FIND_ENTITY,
        get: API_CTRL_ENTITY_GET_ENTITY,
        aggregate: null,
      },
      registry: EntityRegistry.$(),
      registryName: REGISTRY_TXS_SCHEMA
    });
  }


  private static _beforeBuild(entityDef: EntityRef, from: any, to: any) {
    _.keys(from).filter(k => k.startsWith('$')).forEach(k => {
      to[k] = from[k];
    });
  }


  private static _buildEntitySingle(entityDef: IEntityRef, entity: any) {
    return entityDef.build(entity, {
      beforeBuild: EntityService._beforeBuild
    });
  }

  private static _buildEntity(entityDef: IEntityRef, rawEntities: any | any[]) {

    let result = null;
    if (_.isArray(rawEntities)) {
      result = rawEntities.map(r => EntityService._buildEntitySingle(entityDef, r));
    } else {
      result = EntityService._buildEntitySingle(entityDef, rawEntities);
    }

    return result;
  }


  buildEntity?(method: STORAGE_REQUEST_MODE,
               entityRef: IEntityRef, entity: any | any[], buildOptions: IBuildOptions = {}) {
    return EntityService._buildEntity(entityRef, entity);
  }

}
