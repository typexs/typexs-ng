import {Component, OnInit} from '@angular/core';


import * as _ from 'lodash';
import {ITypexsOptions} from '@typexs/base/libs/ITypexsOptions';
import {SystemInfoService} from '../../../system/system-info.service';
import {INodeInfo, SystemNodeInfo} from '@typexs/base';


@Component({
  selector: 'system-nodes',
  templateUrl: './system-nodes.component.html'
})
export class SystemNodesComponent implements OnInit {


  pushTimer: any = null;

  interval = 5000;


  constructor(private infoService: SystemInfoService) {
  }


  selectContext(node: SystemNodeInfo, type: 'tasks' | 'workers'): any[] {
    const x = _.find(node.contexts, (x: INodeInfo) => x.name === type);
    if (!x) {
      return [];
    }
    return x[type];
  }

  infos() {
    return this.infoService;
  }


  networks() {
    return _.keys(this.infos().info.networks);
  }

  networkEntries(key: string) {
    return this.infos().info.networks[key];
  }

  ngOnInit() {
    this.infoService.refresh();
    this.pushTimer = setInterval(() => {
      this.infoService.refresh();
    }, this.interval);
  }


  ngOnDestroy(): void {
    clearInterval(this.pushTimer);
  }
}
