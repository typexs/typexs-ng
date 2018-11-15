import {Component, OnInit} from '@angular/core';
import {IModule} from '@typexs/base/api/IModule';
import * as _ from 'lodash';

import {SystemInfoService} from '../../../system/system-info.service';

@Component({
  selector: 'system-modules',
  templateUrl: './system-modules.component.html'
})
export class SystemModulesComponent implements OnInit {

  modules: IModule[] = [];

  constructor(private infoService: SystemInfoService) {
  }

  objectKeys(obj: any) {
    return _.keys(obj);
  }


  ngOnInit() {
    this.infoService.loadModules(x => {
      this.modules = x;
    });
  }
}
