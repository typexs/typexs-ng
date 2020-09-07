import * as _ from 'lodash';
import {Injectable} from '@angular/core';

import {
  API_CTRL_SERVER_CONFIG,
  API_CTRL_SERVER_ROUTES,
  API_CTRL_SYSTEM_MODULES,
  API_CTRL_SYSTEM_RUNTIME_INFO,
  API_CTRL_SYSTEM_RUNTIME_NODE,
  API_CTRL_SYSTEM_RUNTIME_NODES,
  API_CTRL_SYSTEM_RUNTIME_REMOTE_INFOS,
  API_CTRL_SYSTEM_STORAGES,
  API_CTRL_SYSTEM_WORKERS,
  IRoute
} from '@typexs/server/browser';
import {IModule, IStorageOptions, ITypexsOptions} from '@typexs/base/browser';
import {SystemNodeInfo} from '@typexs/base/entities/SystemNodeInfo';
import {BackendClientService} from './backend-client.service';
import {IWorkerInfo} from '@typexs/base/libs/worker/IWorkerInfo';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {NodeRuntimeInfo} from '@typexs/base/libs/system/NodeRuntimeInfo';
import {BehaviorSubject, combineLatest} from 'rxjs';


@Injectable()
export class SystemInfoService {

  info$: BehaviorSubject<NodeRuntimeInfo> = new BehaviorSubject<NodeRuntimeInfo>(null);

  infos$: BehaviorSubject<NodeRuntimeInfo[]> = new BehaviorSubject<NodeRuntimeInfo[]>(null);

  node$: BehaviorSubject<SystemNodeInfo> = new BehaviorSubject<SystemNodeInfo>(null);

  nodes$: BehaviorSubject<SystemNodeInfo[]> = new BehaviorSubject<SystemNodeInfo[]>(null);

  allNodes: SystemNodeInfo[] = [];

  nodesCount: number = 0;

  timetable: { [k: string]: number } = {};


  constructor(private backendClientService: BackendClientService) {
  }


  usedMemoryPercent(info: NodeRuntimeInfo) {
    return Math.round(((info.memory.total - info.memory.free) / info.memory.total * 10000)) / 100;
  }


  memoryScale(i: number) {
    return Math.round(i / 1024 / 1024);
  }


  refresh(): Observable<boolean> {
    const subject = new Subject<boolean>();
    combineLatest([
      this.getNode(),
      this.getNodes(),
      this.getRuntimeInfo(),
      this.getRuntimeInfos()
    ])
      .subscribe(
        x => {
          subject.next(true);
        },
        error => subject.error(error),
        () => subject.complete()
      );
    return subject.asObservable();
  }


  callRuntimeInfo() {
    return this.getBackendClient().callApi<NodeRuntimeInfo>(API_CTRL_SYSTEM_RUNTIME_INFO);
  }


  callRuntimeInfos() {
    return this.getBackendClient().callApi<NodeRuntimeInfo[]>(API_CTRL_SYSTEM_RUNTIME_REMOTE_INFOS);
  }


  callNodeInfo() {
    return this.getBackendClient().callApi<SystemNodeInfo>(API_CTRL_SYSTEM_RUNTIME_NODE);
  }


  callNodesInfos() {
    return this.getBackendClient().callApi<SystemNodeInfo[]>(API_CTRL_SYSTEM_RUNTIME_NODES);
  }


  getBackendClient() {
    return this.backendClientService;
  }


  private offsetReached(memberName: string) {
    const now = Date.now();
    if (!this.timetable[memberName] || !this[memberName + '$'].getValue()) {
      this.timetable[memberName] = 0;
    }

    if (now - this.timetable[memberName] > 10000) {
      return true;
    }
    return false;
  }


  getNode() {
    if (this.offsetReached('node')) {
      this.callNodeInfo().subscribe((info) => {
        if (info) {
          info.started = new Date(info.started);
          this.node$.next(info);
          info['_active_'] = true;
          _.remove(this.allNodes, x => x.key === info.key);
          this.allNodes.push(info);
          this.allNodes = _.orderBy(this.allNodes, ['_active_', 'key'], ['asc', 'asc']);
          this.nodesCount = this.allNodes.length;
        }
      });
    }
    return this.node$.asObservable();
  }

  getNodeValue() {
    return this.node$.getValue();
  }

  getNodes() {
    if (this.offsetReached('nodes')) {
      this.callNodesInfos().subscribe((info) => {
        if (info) {
          info.map(x => x.started = new Date(x.started));
          this.nodes$.next(info);
          _.remove(this.allNodes, x => !x['_active_']);
          this.allNodes.push(...info);
          this.allNodes = _.orderBy(this.allNodes, ['_active_', 'key'], ['asc', 'asc']);
          this.nodesCount = this.allNodes.length;
        }
      });
    }
    return this.nodes$.asObservable();
  }

  getNodesValue() {
    return this.nodes$.getValue();
  }

  getRuntimeInfo() {
    if (this.offsetReached('runtimeInfo')) {
      this.callRuntimeInfo().subscribe((info) => {
        if (info) {
          this.info$.next(info);
        }
      });
    }
    return this.info$.asObservable();
  }

  getRuntimeInfoValue() {
    return this.info$.getValue();
  }

  getRuntimeInfos() {
    if (this.offsetReached('runtimeInfos')) {
      this.callRuntimeInfos().subscribe((info) => {
        if (info) {
          this.infos$.next(info);
        }
      });
    }
    return this.infos$.asObservable();
  }

  getRuntimeInfosValue() {
    return this.infos$.getValue();
  }

  loadRuntimeInfo(callback?: (err: Error, info: NodeRuntimeInfo) => void) {
    return this.backendClientService.callApi(API_CTRL_SYSTEM_RUNTIME_INFO, {handle: callback});
    //
    // return this.http.get<NodeRuntimeInfo>(this.api + API_CTRL_SYSTEM_RUNTIME_INFO, callback);
  }

  loadRuntimeNode(callback?: (err: Error, node: SystemNodeInfo) => void) {
    return this.backendClientService.callApi(API_CTRL_SYSTEM_RUNTIME_NODE, {handle: callback});
    // return this.http.get<SystemNodeInfo>(this.api + API_CTRL_SYSTEM_RUNTIME_NODE, callback);
  }

  loadRuntimeNodes(callback?: (err: Error, nodes: SystemNodeInfo[]) => void) {
    return this.backendClientService.callApi(API_CTRL_SYSTEM_RUNTIME_NODES, {handle: callback});
    // return this.http.get<SystemNodeInfo[]>(this.api + API_CTRL_SYSTEM_RUNTIME_NODES, callback);
  }

  loadModules(callback?: (err: Error, modules: IModule[]) => void) {
    return this.backendClientService.callApi(API_CTRL_SYSTEM_MODULES, {handle: callback});
    // return this.http.get<IModule[]>(this.api + API_CTRL_SYSTEM_MODULES, callback);
  }

  loadStorages(callback?: (err: Error, storageOptions: IStorageOptions[]) => void) {
    return this.backendClientService.callApi(API_CTRL_SYSTEM_STORAGES, {handle: callback});
    // return this.http.get<IStorageOptions[]>(this.api + API_CTRL_SYSTEM_STORAGES, callback);
  }

  loadConfig(callback?: (err: Error, config: ITypexsOptions[]) => void) {
    return this.backendClientService.callApi(API_CTRL_SERVER_CONFIG, {handle: callback});
    // return this.http.get<ITypexsOptions[]>(this.api + API_CTRL_SYSTEM_CONFIG, callback);
  }

  loadRoutes(callback?: (err: Error, routes: IRoute[]) => void) {
    return this.backendClientService.callApi(API_CTRL_SERVER_ROUTES, {handle: callback});
    // return this.http.get<IRoute[]>(this.api + API_CTRL_SYSTEM_ROUTES, callback);
  }


  loadWorkers(callback?: (err: Error, workerInfos: IWorkerInfo[]) => void) {
    return this.backendClientService.callApi(API_CTRL_SYSTEM_WORKERS, {handle: callback});
    // return this.http.get<IWorkerInfo[]>(this.api + API_CTRL_SYSTEM_WORKERS, callback);
  }


}
