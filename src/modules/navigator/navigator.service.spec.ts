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

  describe('build navigation tree from route paths', () => {
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

      resetConfig(routes: Routes) {
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
      expect(JSON.stringify(tree)).to.deep.eq(JSON.stringify([
        {
          'path': 'admin',
          'children': [
            {
              'path': 'configure',
              'children': [
                {
                  'path': 'module1',
                  'children': []
                },
                {
                  'path': 'module2',
                  'children': []
                }
              ]
            },
            {
              'path': 'storages',
              'children': []
            }
          ]
        }
      ]));
      expect(tree).to.have.length(1);
      expect(tree[0].children).to.have.length(2);
    });


    it('add group label', () => {
      service = TestBed.get(NavigatorService);
      expect(service.getEntries()).to.have.length(5);

      let roots = service.getRoots();
      expect(roots).to.have.length(1);

      service.addGroupEntry('admin/*', {
        label: 'System',
        group: 'admin'
      });
      expect(service.getEntries()).to.have.length(6);

      let tree = service.getTree();
      expect(JSON.stringify(tree)).to.deep.eq(JSON.stringify([
        {
          'label': 'Admin',
          'isGroup': false,
          'path': 'admin',
          'children': [
            {
              'label': 'System',
              'group': 'admin',
              'isGroup': true,
              'children': [
                {
                  'label': 'Configure',
                  'isGroup': false,
                  'path': 'admin/configure',
                  'children': [
                    {
                      'label': 'Module1',
                      'isGroup': false,
                      'path': 'admin/configure/module1',
                      'children': []
                    },
                    {
                      'label': 'Module2',
                      'isGroup': false,
                      'path': 'admin/configure/module2',
                      'children': []
                    }
                  ]
                },
                {
                  'label': 'Storages',
                  'isGroup': false,
                  'path': 'admin/storages',
                  'children': []
                }
              ]
            }
          ]
        }
      ]));


      let treeAdmin = service.getTree('admin');
      expect(JSON.stringify(treeAdmin)).to.deep.eq(JSON.stringify([
        {
          'label': 'System',
          'group': 'admin',
          'isGroup': true,
          'children': [
            {
              'label': 'Configure',
              'isGroup': false,
              'path': 'admin/configure',
              'children': [
                {
                  'label': 'Module1',
                  'isGroup': false,
                  'path': 'admin/configure/module1',
                  'children': []
                },
                {
                  'label': 'Module2',
                  'isGroup': false,
                  'path': 'admin/configure/module2',
                  'children': []
                }
              ]
            },
            {
              'label': 'Storages',
              'isGroup': false,
              'path': 'admin/storages',
              'children': []
            }
          ]
        }
      ]));

    });

  });


  describe('build navigation tree from route already structured paths ', () => {
    let service: NavigatorService;

    class MockRouterStruct {
      config: Routes = [
        {
          path: 'admin',
          children: [
            {path: 'configure', data: {label: 'Config'}},
            {path: 'configure/module1'},
            {path: 'configure/module2'},
            {path: 'storages'}
          ]
        },
      ];

      events: Observable<any> = new Observable<any>(() => {
      });

      resetConfig(routes: Routes) {
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
          {provide: Router, useClass: MockRouterStruct},
          NavigatorService
        ]
      });
    });


    it('auto grouping paths', () => {
      service = TestBed.get(NavigatorService);
      expect(service.getEntries()).to.have.length(5);

      let tree = service.getRebuildRoutes();
      expect(JSON.stringify(tree)).to.deep.eq(JSON.stringify([
        {
          'path': 'admin',
          'children': [
            {
              'path': 'configure',
              'data': {'label': 'Config'},
              'children': [
                {
                  'path': 'module1',
                  'children': []
                },
                {
                  'path': 'module2',
                  'children': []
                }
              ]
            },
            {
              'path': 'storages',
              'children': []
            }
          ]
        }
      ]));
      expect(tree).to.have.length(1);
      expect(tree[0].children).to.have.length(2);
    });


    it('add group label', () => {
      service = TestBed.get(NavigatorService);
      expect(service.getEntries()).to.have.length(5);

      let roots = service.getRoots();
      expect(roots).to.have.length(1);

      service.addGroupEntry('admin/*', {
        label: 'System',
        group: 'admin'
      });
      expect(service.getEntries()).to.have.length(6);

      let tree = service.getTree();

      expect(JSON.stringify(tree)).to.deep.eq(JSON.stringify([
        {
          'label': 'Admin',
          'isGroup': false,
          'path': 'admin',
          'children': [
            {
              'label': 'System',
              'group': 'admin',
              'isGroup': true,
              'children': [
                {
                  'label': 'Config',
                  'isGroup': false,
                  'path': 'admin/configure',
                  'children': [
                    {
                      'label': 'Module1',
                      'isGroup': false,
                      'path': 'admin/configure/module1',
                      'children': []
                    },
                    {
                      'label': 'Module2',
                      'isGroup': false,
                      'path': 'admin/configure/module2',
                      'children': []
                    }
                  ]
                },
                {
                  'label': 'Storages',
                  'isGroup': false,
                  'path': 'admin/storages',
                  'children': []
                }
              ]
            }
          ]
        }
      ]));


      let treeAdmin = service.getTree('admin');

      expect(JSON.stringify(treeAdmin)).to.deep.eq(JSON.stringify([
        {
          'label': 'System',
          'group': 'admin',
          'isGroup': true,
          'children': [
            {
              'label': 'Config',
              'isGroup': false,
              'path': 'admin/configure',
              'children': [
                {
                  'label': 'Module1',
                  'isGroup': false,
                  'path': 'admin/configure/module1',
                  'children': []
                },
                {
                  'label': 'Module2',
                  'isGroup': false,
                  'path': 'admin/configure/module2',
                  'children': []
                }
              ]
            },
            {
              'label': 'Storages',
              'isGroup': false,
              'path': 'admin/storages',
              'children': []
            }
          ]
        }
      ]));

    });

  });

});
