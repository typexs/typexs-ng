import {Component, OnInit} from '@angular/core';


import * as _ from 'lodash';
import {SystemInfoService} from '../../../base/system-info.service';
import {INodeInfo} from '@typexs/base/libs/system/INodeInfo';
import {SystemNodeInfo} from '@typexs/base/entities/SystemNodeInfo';
import {interval, Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';


@Component({
  selector: 'system-nodes',
  templateUrl: './system-nodes.component.html'
})
export class SystemNodesComponent implements OnInit {


  pushTimer: Subscription;

  interval = 5000;


  constructor(private infoService: SystemInfoService) {
  }


  selectContext(node: SystemNodeInfo, type: 'tasks' | 'workers'): any[] {
    const x = _.find(node.contexts, (y: INodeInfo) => y.name === type);
    if (!x) {
      return [];
    }
    return x[type];
  }


  getInfoService() {
    return this.infoService;
  }


  networks() {
    return _.keys(this.getInfoService().getRuntimeInfoValue().networks);
  }


  networkEntries(key: string) {
    return this.getInfoService().getRuntimeInfoValue().networks[key];
  }


  ngOnInit() {
    this.pushTimer =
      interval(this.interval)
        .pipe(
          mergeMap(x => this.infoService.refresh())
        )
        .subscribe(x => {});
  }


  ngOnDestroy(): void {
    this.pushTimer.unsubscribe();
  }
}
