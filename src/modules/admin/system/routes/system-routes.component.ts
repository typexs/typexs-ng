import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IRoute} from 'typexs-server/libs/server/IRoute';

import * as _ from 'lodash';


const API_URL = '/api/routes';

@Component({
  selector: 'system-routes',
  templateUrl: './system-routes.component.html'
})
export class SystemRoutesComponent implements OnInit {

  systemRoutes: IRoute[] = [];


  constructor(private httpService: HttpClient) {
  }

  objectKeys(obj: any) {
    return _.keys(obj);
  }

  load() {
    this.httpService.get<IRoute[]>(API_URL).subscribe(res => {
        this.systemRoutes = res;
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
