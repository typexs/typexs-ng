import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {IStorageOptions} from '@typexs/base/libs/storage/IStorageOptions';
import {SystemInfoService} from '../../../base/services/system-info.service';


const API_CTRL_URL = '/api/storages';

@Component({
  selector: 'system-storages',
  templateUrl: './system-storages.component.html'
})
export class SystemStoragesComponent implements OnInit {

  storages: IStorageOptions[] = [];


  constructor(private infoService: SystemInfoService) {
  }

  objectKeys(obj: any) {
    return _.keys(obj);
  }


  ngOnInit() {
    this.infoService.loadStorages((err: Error, x: IStorageOptions[]) => {
      if (x) {
        this.storages = x;
      }
    });
  }
}
