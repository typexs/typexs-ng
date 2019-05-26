import {Component, HostBinding, Input} from '@angular/core';


import * as _ from 'lodash';
import {SystemNodeInfo} from '@typexs/base/entities/SystemNodeInfo';
import {INodeInfo} from '@typexs/base/libs/system/INodeInfo';


@Component({
  selector: 'system-node-info',
  templateUrl: './system-node-info.component.html'
})
export class SystemNodeInfoComponent {


  collapsed = true;

  @Input()
  type: 'row' = 'row';

  @Input()
  node: SystemNodeInfo;


  selectContext(node: SystemNodeInfo, type: 'tasks' | 'workers'): any[] {
    const x = _.find(node.contexts, (y: INodeInfo) => y.context === type);
    if (!x) {
      return [];
    }
    return x[type];
  }

  toggle() {
    console.log('toggle', this.collapsed);
    this.collapsed = !this.collapsed;
  }

}
