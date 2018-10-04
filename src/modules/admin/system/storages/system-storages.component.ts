import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


import * as _ from 'lodash';
import {IStorageOptions} from 'typexs-base/libs/storage/IStorageOptions';


const API_URL = '/api/storages';

@Component({
  selector: 'system-storages',
  templateUrl: './system-storages.component.html'
})
export class SystemStoragesComponent implements OnInit {

  storages: IStorageOptions[] = [];


  constructor(private httpService: HttpClient) {
  }

  objectKeys(obj: any) {
    return _.keys(obj);
  }

  load() {
    this.httpService.get<IStorageOptions[]>(API_URL).subscribe(res => {
        this.storages = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      });
  }


  ngOnInit() {
    this.load();
  }
}
