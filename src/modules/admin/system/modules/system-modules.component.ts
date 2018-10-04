import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IModule} from 'typexs-base/api/IModule';
import * as _ from 'lodash';


const API_URL = '/api/modules';

@Component({
  selector: 'system-modules',
  templateUrl: './system-modules.component.html'
})
export class SystemModulesComponent implements OnInit {

  systemMmodules: IModule[] = [];


  constructor(private httpService: HttpClient) {
  }

  objectKeys(obj: any) {
    return _.keys(obj);
  }

  loadModules() {
    this.httpService.get<IModule[]>(API_URL).subscribe(res => {
        this.systemMmodules = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      });
  }


  ngOnInit() {
    this.loadModules();
  }
}
