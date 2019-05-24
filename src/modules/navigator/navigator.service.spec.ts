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
          RouterTestingModule
        ],
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
      const entries = service.getEntries();
      expect(entries).to.have.length(5);

      const routesConfig = service.getRebuildRoutes();
      expect(routesConfig).to.have.length(1);
      expect(routesConfig[0].children).to.have.length(2);
      expect(routesConfig[0].path).to.eq('admin');
      expect(routesConfig[0].children[0].path).to.eq('configure');
      expect(routesConfig[0].children[1].path).to.eq('storages');
      expect(routesConfig[0].children[0].children[0].path).to.eq('module1');
      expect(routesConfig[0].children[0].children[1].path).to.eq('module2');
    });


    it('add group label', () => {
      service = TestBed.get(NavigatorService);
      expect(service.getEntries()).to.have.length(5);

      const roots = service.getRoots();
      expect(roots).to.have.length(1);

      service.addGroupEntry('admin/.*', {
        label: 'System',
        group: 'admin'
      });
      expect(service.getEntries()).to.have.length(6);

      const tree = service.getTree();
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


      const treeAdmin = service.getTree('admin');
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
        {path: 'demo', data: {label: 'Demo'}},
        {path: 'user/data', data: {label: 'UserData'}},
        {path: 'user/login', data: {label: 'UserLogin'}},
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
      const entries = service.getEntries();
      expect(entries).to.have.length(8);

      const tree = service.getRebuildRoutes();
      expect(tree).to.have.length(4);
      expect(tree[0].path).to.eq('admin');
      expect(tree[0].children).to.have.length(2);
      expect(tree[0].children[0].path).to.eq('configure');
      expect(tree[0].children[0].data.label).to.eq('Config');
      expect(tree[0].children[1].path).to.eq('storages');
      expect(tree[0].children[0].children[0].path).to.eq('module1');
      expect(tree[0].children[0].children[1].path).to.eq('module2');

    });


    it('add group label', () => {
      service = TestBed.get(NavigatorService);
      expect(service.getEntries()).to.have.length(8);

      const roots = service.getRoots();
      expect(roots).to.have.length(4);

      service.addGroupEntry('admin/.*', {
        label: 'System',
        group: 'admin'
      });
      expect(service.getEntries()).to.have.length(9);

      const tree = service.getTree();
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
        },
        {
          'children': [],
          'isGroup': false,
          'label': 'Demo',
          'path': 'demo',
        },
        {
          'children': [],
          'isGroup': false,
          'label': 'UserData',
          'path': 'user/data'
        },
        {
          'children': [],
          'isGroup': false,
          'label': 'UserLogin',
          'path': 'user/login'
        }
      ]);


      const treeAdmin = service.getTree('admin');
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
      expect(service.getEntries()).to.have.length(8);

      const roots = service.getRoots();
      expect(roots).to.have.length(4);

      service.addGroupEntry('admin/.*', {
        label: 'System',
        group: 'admin'
      });
      expect(service.getEntries()).to.have.length(9);

      const routes: Route[] = service.getRebuildRoutes();
      expect(routes).to.have.length(4);
      expect(routes[0].children).to.have.length(2);


    });

    it('rebuild routes before and after group added', () => {
      const router = TestBed.get(Router);
      service = TestBed.get(NavigatorService);

      service.read(router.config);
      expect(service.getEntries()).to.have.length(8);
      service.addGroupEntry('admin/.*', {
        label: 'System',
        group: 'admin'
      });
      const entries1 = service.getEntries();
      expect(entries1).to.have.length(9);
      const treeBefore = service.getTree();
      expect(treeBefore[0].path).to.eq('admin');
      expect(treeBefore[0].children).to.have.length(1);
      expect(treeBefore[0].children[0].label).to.be.eq('System');
      expect(treeBefore[0].children[0].children).to.have.length(2);
      expect(treeBefore[0].children[0].children[0].label).to.eq('Config');
      expect(treeBefore[0].children[0].children[1].label).to.eq('Storages');

      service.read(router.config);
      const entries2 = service.getEntries();
      expect(entries2).to.have.length(9);
      const treeAfter = service.getTree();
      expect(treeAfter[0].path).to.eq('admin');
      expect(treeAfter[0].children).to.have.length(1);
      expect(treeAfter[0].children[0].label).to.be.eq('System');
      expect(treeAfter[0].children[0].children).to.have.length(2);
      expect(treeAfter[0].children[0].children[0].label).to.eq('Config');
      expect(treeAfter[0].children[0].children[1].label).to.eq('Storages');

      expect(entries1.map(e => e.id)).to.deep.eq(entries2.map(e => e.id));
    });


    /**
     * Manuel regrouping put user entries into demo
     */
    it('rebuild routes after manuel regroup with path renaming', () => {
      const router = TestBed.get(Router);
      service = TestBed.get(NavigatorService);

      const demoEntries = service.getEntry('demo');
      const entries = service.getEntriesByPathPattern(/^user\//);
      entries.forEach(e => {
        e.setParent(demoEntries);
      });
      const routes = service.getRebuildRoutes();
      router.resetConfig(routes);
      service.read(router.config);

      const demoTree = service.getTree('demo');

      // check if paths are correctly set
      expect(demoTree).to.have.length(2);
      expect(demoTree[0].path).to.be.eq('demo/user/data');
      expect(demoTree[1].path).to.be.eq('demo/user/login');
    });

    /**
     * Manuel regrouping put user entries into demo
     */
    it('rebuild routes after manuel regroup without path renaming', () => {
      const router = TestBed.get(Router);
      service = TestBed.get(NavigatorService);

      const demoEntries = service.getEntry('demo');
      const entries = service.getEntriesByPathPattern(/^user\//);
      entries.forEach(e => {
        e.markAsFixedPath();
        e.setParent(demoEntries);
      });
      const routes = service.getRebuildRoutes();
      router.resetConfig(routes);
      service.read(router.config);

      const demoTree = service.getTree('demo');

      // check if paths are correctly set
      expect(demoTree).to.have.length(2);
      expect(demoTree[0].path).to.be.eq('user/data');
      expect(demoTree[1].path).to.be.eq('user/login');
    });


  });


  describe('build navigation tree from root / path', () => {
    let service: NavigatorService;

    class MockRouterStruct {
      config: Routes = [
        {path: '', data: {group: 'test'}},
        {path: 'admin'},
        {path: 'admin/configure'},
        {path: 'admin/storages'},
        {path: 'level'},
        {path: 'level/one'},
        {path: 'level/two'},
        {path: 'group/two'},
        {path: 'group/one'},
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
      const entries = service.getEntries();
      expect(entries).to.have.length(9);

      const tree = service.getRebuildRoutes();
      expect(tree).to.have.length(1);
      expect(tree[0].path).to.eq('');
      expect(tree[0].children).to.have.length(4);
      expect(_.map(tree[0].children, p => p.path)).to.deep.eq([
        'admin',
        'level',
        'group/two',
        'group/one'
      ]);
      /*
      expect(tree[0].children[0].data.label).to.eq('Config');
      expect(tree[0].children[1].path).to.eq('storages');
      expect(tree[0].children[0].children[0].path).to.eq('module1');
      expect(tree[0].children[0].children[1].path).to.eq('module2');
      */
    });

    it('add group without base element', () => {
      service = TestBed.get(NavigatorService);
      expect(service.getEntries()).to.have.length(9);


      service.addGroupEntry('group/.*', {
        label: 'Group',
        group: 'group'
      });
      expect(service.getEntries()).to.have.length(10);

      const tree = service.getTree();
      const t = clearTree(tree);
      expect(tree).to.have.length(1);
      expect(tree[0].children).to.have.length(3);
      expect(_.map(tree[0].children, p => p.label)).to.deep.eq([
        'Admin',
        'Level',
        'Group'
      ]);
    });


  });

});
