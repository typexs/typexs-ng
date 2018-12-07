import * as _ from 'lodash';
import {expect} from 'chai';
import {TestBed} from '@angular/core/testing';
import {NavigatorService} from './navigator.service';
import {Route, Router, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {ApplicationInitStatus} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {Observable} from 'rxjs/Observable';
import {inspect} from 'util';

function clearTree(tree: any[]) {
  _.map(tree, t => {
    delete t.entry;
    if (!_.isEmpty(t.children)) {
      clearTree(t.children);
    }

  });
}


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
      expect(tree).to.have.length(1);
      expect(tree[0].children).to.have.length(2);
      expect(tree[0].path).to.eq('admin');
      expect(tree[0].children[0].path).to.eq('configure');
      expect(tree[0].children[1].path).to.eq('storages');
      expect(tree[0].children[0].children[0].path).to.eq('module1');
      expect(tree[0].children[0].children[1].path).to.eq('module2');
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
      clearTree(tree);
      expect(tree).to.deep.eq([
        {
          'label': 'Admin',
          'isGroup': false,
          'path': 'admin',
          'children': [
            {
              'label': 'System',
              'isGroup': true,
              'groups': ['admin'],
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
      ]);


      let treeAdmin = service.getTree('admin');
      clearTree(treeAdmin);
      expect(treeAdmin).to.deep.eq([
        {
          'label': 'System',
          'isGroup': true,
          'groups': ['admin'],
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
      ]);
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
      expect(tree).to.have.length(1);
      expect(tree[0].children).to.have.length(2);
      expect(tree[0].path).to.eq('admin');
      expect(tree[0].children[0].path).to.eq('configure');
      expect(tree[0].children[0].data.label).to.eq('Config');
      expect(tree[0].children[1].path).to.eq('storages');
      expect(tree[0].children[0].children[0].path).to.eq('module1');
      expect(tree[0].children[0].children[1].path).to.eq('module2');

    });


    it('add group label', () => {
      service = TestBed.get(NavigatorService);
      expect(service.getEntries()).to.have.length(5);

      let roots = service.getRoots();
      expect(roots).to.have.length(1);

      service.addGroupEntry('admin/.*', {
        label: 'System',
        group: 'admin'
      });
      expect(service.getEntries()).to.have.length(6);

      let tree = service.getTree();
      clearTree(tree);
      expect(tree).to.deep.eq([
        {
          'label': 'Admin',
          'isGroup': false,
          'path': 'admin',
          'children': [
            {
              'label': 'System',
              'isGroup': true,
              'groups': ['admin'],
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
      ]);


      let treeAdmin = service.getTree('admin');
      clearTree(treeAdmin);
      expect(treeAdmin).to.deep.eq([
        {
          'label': 'System',
          'isGroup': true,
          'groups': ['admin'],
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
      ]);
    });


    it('add group label and rebuild', () => {
      service = TestBed.get(NavigatorService);
      expect(service.getEntries()).to.have.length(5);

      let roots = service.getRoots();
      expect(roots).to.have.length(1);

      service.addGroupEntry('admin/.*', {
        label: 'System',
        group: 'admin'
      });
      expect(service.getEntries()).to.have.length(6);

      let routes: Route[] = service.getRebuildRoutes();
      expect(routes).to.have.length(1);
      expect(routes[0].children).to.have.length(2);


    });

    it('rebuild routes before and after group added', () => {
      let router = TestBed.get(Router);
      service = TestBed.get(NavigatorService);

      service.read(router.config);
      expect(service.getEntries()).to.have.length(5);
      service.addGroupEntry('admin/.*', {
        label: 'System',
        group: 'admin'
      });
      let entries1 = service.getEntries();
      expect(entries1).to.have.length(6);
      let treeBefore = service.getTree();
      expect(treeBefore[0].path).to.eq('admin');
      expect(treeBefore[0].children).to.have.length(1);
      expect(treeBefore[0].children[0].label).to.be.eq('System');
      expect(treeBefore[0].children[0].children).to.have.length(2);
      expect(treeBefore[0].children[0].children[0].label).to.eq('Config');
      expect(treeBefore[0].children[0].children[1].label).to.eq('Storages');

      service.read(router.config);
      let entries2 = service.getEntries();
      expect(entries2).to.have.length(6);
      let treeAfter = service.getTree();
      expect(treeAfter[0].path).to.eq('admin');
      expect(treeAfter[0].children).to.have.length(1);
      expect(treeAfter[0].children[0].label).to.be.eq('System');
      expect(treeAfter[0].children[0].children).to.have.length(2);
      expect(treeAfter[0].children[0].children[0].label).to.eq('Config');
      expect(treeAfter[0].children[0].children[1].label).to.eq('Storages');

      expect(entries1.map(e => e.id)).to.deep.eq(entries2.map(e => e.id));
    });


  });

});
