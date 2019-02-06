import {Injectable} from '@angular/core';

import {API_SYSTEM_CONFIG, API_SYSTEM_MODULES, API_SYSTEM_ROUTES, API_SYSTEM_STORAGES, IRoute} from '@typexs/server/browser';
import {IModule, IStorageOptions, ITypexsOptions} from '@typexs/base/browser';
import {HttpClientWrapper} from './http-client-wrapper.service';


@Injectable()
export class SystemInfoService {

  constructor(private http: HttpClientWrapper) {
  }


  loadModules(callback?: (err:Error,modules: IModule[]) => void) {
    return this.http.get<IModule[]>(API_SYSTEM_MODULES, callback);
  }

  loadStorages(callback?: (err:Error,storageOptions: IStorageOptions[]) => void) {
    return this.http.get<IStorageOptions[]>(API_SYSTEM_STORAGES, callback);
  }

  loadConfig(callback?: (err:Error,config: ITypexsOptions[]) => void) {
    return this.http.get<ITypexsOptions[]>(API_SYSTEM_CONFIG, callback);
  }

  loadRoutes(callback?: (err:Error,routes: IRoute[]) => void) {
    return this.http.get<IRoute[]>(API_SYSTEM_ROUTES, callback);
  }

}
