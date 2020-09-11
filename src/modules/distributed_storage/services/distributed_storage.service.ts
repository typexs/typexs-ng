import {Injectable} from '@angular/core';
import {AuthService} from '../../base/api/auth/auth.service';
import {BackendClientService} from '../../base/backend-client.service';
import {
  API_CTRL_DISTRIBUTED_STORAGE,
  API_CTRL_DISTRIBUTED_STORAGE_DELETE_ENTITY,
  API_CTRL_DISTRIBUTED_STORAGE_FIND_ENTITY,
  API_CTRL_DISTRIBUTED_STORAGE_GET_ENTITY,
  API_CTRL_DISTRIBUTED_STORAGE_SAVE_ENTITY,
  API_CTRL_DISTRIBUTED_STORAGE_UPDATE_ENTITY
} from '@typexs/server/browser';
import {IQueringService} from '../../base/api/querying/IQueringService';
import {AbstractQueryService} from '../../base/api/querying/abstract-query.service';


@Injectable()
export class DistributedStorageService
  extends AbstractQueryService
  implements IQueringService {

  constructor(private http: BackendClientService,
              private authService: AuthService) {
    super(http, authService, {
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
      ngRoutePrefix: API_CTRL_DISTRIBUTED_STORAGE
    });
  }




}
