import {Injectable} from '@angular/core';
import * as _ from 'lodash';
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
import {REGISTRY_TYPEORM, TypeOrmEntityRegistry} from '@typexs/base/browser';
import {IBuildOptions, IEntityRef} from 'commons-schema-api/browser';
import {Subject} from 'rxjs/Subject';
import {IQueringService} from '../system/api/querying/IQueringService';
import {AbstractQueryService} from '../system/api/querying/abstract-query.service';


@Injectable()
export class StorageService extends AbstractQueryService implements IQueringService {

  constructor(private http: HttpClientWrapper,
              private authService: AuthService) {
    super(http, authService, TypeOrmEntityRegistry.$(), {
      urlRegistryMetadata: StorageService.url(API_STORAGE_METADATA_ALL_ENTITIES),
      urlGetEntity: StorageService.url(API_STORAGE_GET_ENTITY),
      urlQueryEntity: StorageService.url(API_STORAGE_FIND_ENTITY),
      urlDeleteEntity: StorageService.url(API_STORAGE_DELETE_ENTITY),
      urlSaveEntity: StorageService.url(API_STORAGE_SAVE_ENTITY),
      urlUpdateEntity: StorageService.url(API_STORAGE_UPDATE_ENTITY),
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


  static url(url: string, replace: any = null) {
    url = 'api' + API_STORAGE_PREFIX + url;
    if (replace) {
      _.keys(replace).forEach(k => {
        url = url.replace(':' + k, replace[k]);
      });
    }
    return url;
  }


  buildEntity(method: 'get', entityDef: IEntityRef, rawEntities: any | any[], options?: IBuildOptions) {
    let result = null;
    if (_.isArray(rawEntities)) {
      result = rawEntities.map(r => StorageService._buildEntitySingle(entityDef, r, options));
    } else {
      result = StorageService._buildEntitySingle(entityDef, rawEntities, options);
    }
    return result;
  }


  buildOptions(method: 'get', options: any, buildOptions: any) {
    if (_.get(options, 'raw', false)) {
      _.set(buildOptions, 'raw', options.raw);
    }
  }


  getStorages(): Observable<IStorageRefMetadata[]> {
    const obs = new Subject<IStorageRefMetadata[]>();
    this.http.get(StorageService.url(API_STORAGE_METADATA_ALL_STORES),
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



}
