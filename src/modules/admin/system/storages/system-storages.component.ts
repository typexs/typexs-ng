import {Component, OnInit} from '@angular/core';


import * as _ from 'lodash';
import {IStorageOptions} from 'typexs-base/libs/storage/IStorageOptions';
import {SystemInfoService} from '../../../system/system-info.service';


const API_URL = '/api/storages';

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
    this.infoService.loadStorages(x => {
      this.storages = x;
    });
  }
}
