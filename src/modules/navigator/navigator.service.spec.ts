import {expect} from 'chai';
import {TestBed} from '@angular/core/testing';
import {NavigatorService} from './navigator.service';
import {Router, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {ApplicationInitStatus} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {Observable} from '../../../node_modules/rxjs';

describe('Service: NavigatorService', () => {

  describe('build navigation graph', () => {
    let service: NavigatorService;

    class MockRouter {
      config: Routes = [
        {path: 'admin'},
        {path: 'admin/configure'},
        {path: 'admin/configure/module1'},
        {path: 'admin/configure/module2'},
        {path: 'admin/storages'}
      ];

      events: Observable<any> = new Observable<any>(() => {
      });

      resetConfig(routes:Routes){
        this.config = routes;
      }
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserTestingModule,
          RouterTestingModule],
        providers: [
          {provide: APP_BASE_HREF, useValue: '/'},
          ApplicationInitStatus,
          {provide: Router, useClass: MockRouter},
          NavigatorService
        ]
      });
    });


    it('auto grouping paths', () => {
      service = TestBed.get(NavigatorService);
      expect(service.getEntries()).to.have.length(5);
      let tree = service.getRebuildRoutes();
      expect(tree).to.have.length(1);
      expect(tree[0].children).to.have.length(2);
    });

    it('add group label', () => {
      service = TestBed.get(NavigatorService);
      expect(service.getEntries()).to.have.length(5);
      // service.addGroupLabel('admin')
    });

  });

});
