import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../base/api/auth/auth.service';
import {BackendClientService} from '../base/backend-client.service';
import {
  API_CTRL_DISTRIBUTED_STORAGE, API_CTRL_DISTRIBUTED_STORAGE_DELETE_ENTITY,
  API_CTRL_DISTRIBUTED_STORAGE_FIND_ENTITY,
  API_CTRL_DISTRIBUTED_STORAGE_GET_ENTITY, API_CTRL_DISTRIBUTED_STORAGE_SAVE_ENTITY, API_CTRL_DISTRIBUTED_STORAGE_UPDATE_ENTITY,
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
import {IBuildOptions, IEntityRef, XS_GLOBALLY} from 'commons-schema-api/browser';
import {IQueringService} from '../base/api/querying/IQueringService';
import {AbstractQueryService} from '../base/api/querying/abstract-query.service';
import {C_RAW, C_SKIP_BUILDS, STORAGE_REQUEST_MODE} from '../base/api/querying/Constants';


@Injectable()
export class DistributedStorageService extends AbstractQueryService implements IQueringService {

  constructor(private http: BackendClientService,
              private authService: AuthService) {
    super(http, authService, TypeOrmEntityRegistry.$(), {
      routes: {
        metadata: null,
        get: API_CTRL_DISTRIBUTED_STORAGE_GET_ENTITY,
        query: API_CTRL_DISTRIBUTED_STORAGE_FIND_ENTITY,
        aggregate: API_CTRL_DISTRIBUTED_STORAGE_FIND_ENTITY,
        delete: API_CTRL_DISTRIBUTED_STORAGE_DELETE_ENTITY,
        delete_by_condition: null,
        save: API_CTRL_DISTRIBUTED_STORAGE_SAVE_ENTITY,
        update: API_CTRL_DISTRIBUTED_STORAGE_UPDATE_ENTITY,
        update_by_condition: null,
      },
      ngRoutePrefix: API_CTRL_DISTRIBUTED_STORAGE,
      registryName: XS_GLOBALLY
    });
  }




}
