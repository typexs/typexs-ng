import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {API_SYSTEM_CONFIG, API_SYSTEM_MODULES, API_SYSTEM_ROUTES, API_SYSTEM_STORAGES, IRoute} from '@typexs/server/browser';
import {IModule, IStorageOptions, ITypexsOptions} from '@typexs/base/browser';
import {MessageService} from './messages/message.service';
import {MessageChannel} from './messages/MessageChannel';
import {LogMessage} from './messages/types/LogMessage';



@Injectable()
export class SystemInfoService {

  logChannel: MessageChannel<LogMessage>;


  constructor(private http: HttpClient,private messageService: MessageService) {
    this.logChannel = messageService.getLogService();
  }


  load<T>(url: string, response: (data: T) => void): void {
    this.http.get<T>(url).subscribe(res => {
        response(res);
      },
      (err: HttpErrorResponse) => {
        this.logChannel.publish(LogMessage.error(err));
      });

  }

  loadModules(callback: (modules: IModule[]) => void) {
    this.load<IModule[]>(API_SYSTEM_MODULES, callback);
  }

  loadStorages(callback: (storageOptions: IStorageOptions[]) => void) {
    this.load<IStorageOptions[]>(API_SYSTEM_STORAGES, callback);
  }

  loadConfig(callback: (config: ITypexsOptions[]) => void) {
    this.load<ITypexsOptions[]>(API_SYSTEM_CONFIG, callback);
  }

  loadRoutes(callback: (routes: IRoute[]) => void) {
    this.load<IRoute[]>(API_SYSTEM_ROUTES, callback);
  }

}
