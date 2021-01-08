import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../base/api/auth/auth.service';
import {BackendClientService} from '../base/backend-client.service';
import {
  API_CTRL_STORAGE_AGGREGATE_ENTITY,
  API_CTRL_STORAGE_DELETE_ENTITIES_BY_CONDITION,
  API_CTRL_STORAGE_DELETE_ENTITY,
  API_CTRL_STORAGE_FIND_ENTITY,
  API_CTRL_STORAGE_GET_ENTITY,
  API_CTRL_STORAGE_METADATA_ALL_ENTITIES,
  API_CTRL_STORAGE_METADATA_ALL_STORES,
  API_CTRL_STORAGE_SAVE_ENTITY,
  API_CTRL_STORAGE_UPDATE_ENTITIES_BY_CONDITION,
  API_CTRL_STORAGE_UPDATE_ENTITY,
  IStorageRefMetadata
} from '@typexs/server/browser';
import {REGISTRY_TYPEORM, TypeOrmEntityRegistry} from '@typexs/base/browser';
import {IBuildOptions, IEntityRef} from 'commons-schema-api/browser';
import {IQueringService} from '../base/api/querying/IQueringService';
import {AbstractQueryService} from '../base/api/querying/abstract-query.service';
import {C_RAW, C_SKIP_BUILDS, STORAGE_REQUEST_MODE} from '../base/api/querying/Constants';
import {Log} from '../base/lib/log/Log';


@Injectable()
export class StorageService extends AbstractQueryService implements IQueringService {

  constructor(private http: BackendClientService,
              private authService: AuthService) {
    super(http, authService, {
      routes: {
        metadata: API_CTRL_STORAGE_METADATA_ALL_ENTITIES,
        get: API_CTRL_STORAGE_GET_ENTITY,
        query: API_CTRL_STORAGE_FIND_ENTITY,
        aggregate: API_CTRL_STORAGE_AGGREGATE_ENTITY,
        delete: {route: API_CTRL_STORAGE_DELETE_ENTITY, method: 'delete'},
        delete_by_condition: {route: API_CTRL_STORAGE_DELETE_ENTITIES_BY_CONDITION, method: 'delete'},
        save: API_CTRL_STORAGE_SAVE_ENTITY,
        update: API_CTRL_STORAGE_UPDATE_ENTITY,
        update_by_condition: API_CTRL_STORAGE_UPDATE_ENTITIES_BY_CONDITION,
      },
      registry: TypeOrmEntityRegistry.$(),
      ngRoutePrefix: '/storage',
      registryName: REGISTRY_TYPEORM
    });
  }


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
    if (_.get(options, C_SKIP_BUILDS, false)) {
      const x = entityDef.create();
      _.assign(x, entity);
      return x;
    }
    const opts = _.defaults(options, {
      beforeBuild: StorageService._beforeBuild
    });
    if (_.get(options, C_RAW, false)) {
      opts.beforeBuild = StorageService._beforeBuildRaw;
    }
    return entityDef.build(entity, opts);
  }


  buildEntity(method: STORAGE_REQUEST_MODE, entityDef: IEntityRef, rawEntities: any | any[], options?: IBuildOptions) {
    if (method === 'aggregate') {
      return rawEntities;
    }
    if (entityDef) {
      let result = null;
      if (_.isArray(rawEntities)) {
        result = rawEntities.map(r => StorageService._buildEntitySingle(entityDef, r, options));
      } else {
        result = StorageService._buildEntitySingle(entityDef, rawEntities, options);
      }
      return result;
    } else {
      Log.warn('passing entity cause not entity ref given');
      return rawEntities;
    }

  }


  buildOptions(method: STORAGE_REQUEST_MODE, options: any, buildOptions: any) {
    if (_.get(options, C_RAW, false)) {
      _.set(buildOptions, C_RAW, options.raw);
    }
  }


  getStorages(): Observable<IStorageRefMetadata[]> {
    return this.http.callApi(API_CTRL_STORAGE_METADATA_ALL_STORES);
  }


}
