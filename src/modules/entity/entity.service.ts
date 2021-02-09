import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {EntityRef} from '@typexs/schema/libs/registry/EntityRef';
import {AuthService} from '../base/api/auth/auth.service';
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
} from '@typexs/schema';
import {IBuildOptions, IEntityRef} from 'commons-schema-api/browser';
import {C_RAW, C_SKIP_BUILDS, STORAGE_REQUEST_MODE} from '../base/api/querying/Constants';
import {EntityResolverService} from '../base/services/entity-resolver.service';
import {BackendService} from '../base/api/backend/backend.service';
import {__CLASS__, __REGISTRY__} from '@typexs/base';


@Injectable()
export class EntityService extends AbstractQueryService implements IQueringService {


  constructor(private backend: BackendService, private authService: AuthService, private resolverService: EntityResolverService) {
    super(backend, authService, resolverService, {
      ngRoutePrefix: API_ENTITY_PREFIX,
      routes: {
        metadata: API_CTRL_ENTITY_METADATA_ALL_ENTITIES,
        update: API_CTRL_ENTITY_UPDATE_ENTITY,
        update_by_condition: null,
        save: API_CTRL_ENTITY_SAVE_ENTITY,
        delete: {route: API_CTRL_ENTITY_DELETE_ENTITY, method: 'delete'},
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
  private _buildEntitySingle(entityDef: IEntityRef, entity: any, options?: IBuildOptions) {
    let def = entityDef;
    if (!entityDef) {
      if (entity[__CLASS__] && entity[__REGISTRY__]) {
        def = this.getRegistry().getEntityRefFor(entity[__CLASS__]);
      }
    }

    if (def) {
      const dynamic = def.getOptions('dynamic');
      if (_.get(options, C_SKIP_BUILDS, false) || dynamic === true) {
        const x = def.create();
        _.assign(x, entity);
        return x;
      }
      const opts = _.defaults(options, {
        beforeBuild: EntityService._beforeBuild
      });
      if (_.get(options, C_RAW, false)) {
        opts.beforeBuild = EntityService._beforeBuildRaw;
      }
      return def.build(entity, opts);
    } else {
      return entity;
    }
  }


  buildEntity?(method: STORAGE_REQUEST_MODE,
               entityRef: IEntityRef, rawEntities: any | any[], buildOptions: IBuildOptions = {}) {
    if (method === 'aggregate') {
      return rawEntities;
    }

    let result = null;
    if (_.isArray(rawEntities)) {
      result = rawEntities.map(r => this._buildEntitySingle(entityRef, r, buildOptions));
    } else {
      result = this._buildEntitySingle(entityRef, rawEntities, buildOptions);
    }
    return result;
  }

  buildOptions(method: STORAGE_REQUEST_MODE, options: any, buildOptions: any) {
    if (_.get(options, C_RAW, false)) {
      _.set(buildOptions, C_RAW, options.raw);
    }
  }

}
