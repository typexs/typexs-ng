import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {API_SYSTEM_CONFIG, API_SYSTEM_MODULES, API_SYSTEM_ROUTES, API_SYSTEM_STORAGES} from 'typexs-server/types';
import {IModule} from 'typexs-base/api/IModule';
import {IStorageOptions} from 'typexs-base/libs/storage/IStorageOptions';
import {ITypexsOptions} from 'typexs-base/libs/ITypexsOptions';
import {IRoute} from 'typexs-server/libs/server/IRoute';

@Injectable()
export class SystemInfoService {


  constructor(private http: HttpClient) {
  }


  load<T>(url: string, response: (data: T) => void): void {
    this.http.get<T>(url).subscribe(res => {
        response(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      });

  }

  loadModules(callback: (modules: IModule[]) => void) {
    this.load<IModule[]>(API_SYSTEM_MODULES, callback);
  }

  loadStorages(callback: (storageOptions: IStorageOptions[]) => void) {
    this.load<IStorageOptions[]>(API_SYSTEM_STORAGES, callback);
  }

  loadConfig(callback: (config: ITypexsOptions) => void) {
    this.load<ITypexsOptions>(API_SYSTEM_CONFIG, callback);
  }

  loadRoutes(callback: (routes: IRoute[]) => void) {
    this.load<IRoute[]>(API_SYSTEM_ROUTES, callback);
  }

}
