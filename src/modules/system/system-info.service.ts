import {Injectable} from '@angular/core';

import {
  API_CTRL_SYSTEM_CONFIG,
  API_CTRL_SYSTEM_MODULES,
  API_CTRL_SYSTEM_ROUTES,
  API_CTRL_SYSTEM_RUNTIME_INFO,
  API_CTRL_SYSTEM_RUNTIME_NODE,
  API_CTRL_SYSTEM_RUNTIME_NODES,
  API_CTRL_SYSTEM_STORAGES,
  API_CTRL_SYSTEM_WORKERS,
  IRoute
} from '@typexs/server/browser';
import {IModule, IStorageOptions, ITypexsOptions} from '@typexs/base/browser';
import {SystemNodeInfo} from '@typexs/base/entities/SystemNodeInfo';
import {HttpClientWrapper} from './http-client-wrapper.service';
import {IWorkerInfo} from '@typexs/base/libs/worker/IWorkerInfo';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {NodeRuntimeInfo} from '@typexs/base/libs/system/NodeRuntimeInfo';


@Injectable()
export class SystemInfoService {

  info: NodeRuntimeInfo;

  node: SystemNodeInfo;

  nodes: SystemNodeInfo[];

  api = '/api';


  constructor(private http: HttpClientWrapper) {
  }


  usedMemoryPercent(info: NodeRuntimeInfo) {
    return Math.round(((info.memory.total - info.memory.free) / info.memory.total * 10000)) / 100;
  }

  memoryScale(i: number) {
    return Math.round(i / 1024 / 1024);
  }


  refresh(): Observable<boolean> {
    const subject = new Subject<boolean>();
    let x = 0;
    this.loadRuntimeInfo((err, info) => {
      this.info = info;
      x += 1;
      if (x === 7) {
        subject.next(true);
        subject.complete();
      }
    });
    this.loadRuntimeNode((err, node) => {
      this.node = node;
      x += 2;
      if (x === 7) {
        subject.next(true);
        subject.complete();
      }
    });
    this.loadRuntimeNodes((err, nodes) => {
      this.nodes = nodes;
      x += 4;
      if (x === 7) {
        subject.next(true);
        subject.complete();
      }
    });
    return subject.asObservable();
  }

  loadRuntimeInfo(callback?: (err: Error, info: NodeRuntimeInfo) => void) {
    return this.http.get<NodeRuntimeInfo>(this.api + API_CTRL_SYSTEM_RUNTIME_INFO, callback);
  }

  loadRuntimeNode(callback?: (err: Error, node: SystemNodeInfo) => void) {
    return this.http.get<SystemNodeInfo>(this.api + API_CTRL_SYSTEM_RUNTIME_NODE, callback);
  }

  loadRuntimeNodes(callback?: (err: Error, nodes: SystemNodeInfo[]) => void) {
    return this.http.get<SystemNodeInfo[]>(this.api + API_CTRL_SYSTEM_RUNTIME_NODES, callback);
  }

  loadModules(callback?: (err: Error, modules: IModule[]) => void) {
    return this.http.get<IModule[]>(this.api + API_CTRL_SYSTEM_MODULES, callback);
  }

  loadStorages(callback?: (err: Error, storageOptions: IStorageOptions[]) => void) {
    return this.http.get<IStorageOptions[]>(this.api + API_CTRL_SYSTEM_STORAGES, callback);
  }

  loadConfig(callback?: (err: Error, config: ITypexsOptions[]) => void) {
    return this.http.get<ITypexsOptions[]>(this.api + API_CTRL_SYSTEM_CONFIG, callback);
  }

  loadRoutes(callback?: (err: Error, routes: IRoute[]) => void) {
    return this.http.get<IRoute[]>(this.api + API_CTRL_SYSTEM_ROUTES, callback);
  }


  loadWorkers(callback?: (err: Error, workerInfos: IWorkerInfo[]) => void) {
    return this.http.get<IWorkerInfo[]>(this.api + API_CTRL_SYSTEM_WORKERS, callback);
  }

}
