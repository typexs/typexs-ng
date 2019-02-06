import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IRoute} from '@typexs/server/libs/server/IRoute';

import * as _ from 'lodash';
import {SystemInfoService} from '../../../system/system-info.service';


const API_URL = '/api/routes';

@Component({
  selector: 'system-routes',
  templateUrl: './system-routes.component.html'
})
export class SystemRoutesComponent implements OnInit {

  routes: IRoute[] = [];


  constructor(private infoService: SystemInfoService) {
  }

  objectKeys(obj: any) {
    return _.keys(obj);
  }

  ngOnInit() {
    this.infoService.loadRoutes((err:Error,x:IRoute[]) => {
      if(x){
        this.routes = x;
      }
    });
  }
}
