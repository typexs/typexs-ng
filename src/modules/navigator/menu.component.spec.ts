import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigatorService} from './navigator.service';
import {Router, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {ApplicationInitStatus, Injectable} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {Observable} from 'rxjs/Observable';
import {MenuComponent} from './menu.component';
import {MenuLinkComponent} from './menu-link.component';
import {expect} from 'chai';
import * as _ from 'lodash';
import {NavEntry} from './NavEntry';
import {IMenuLinkGuard} from './IMenuLinkGuard';


describe('Component: Menu', () => {

  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  let componentLink: MenuLinkComponent;
  let fixtureLink: ComponentFixture<MenuLinkComponent>;

  @Injectable()
  class MockGuard implements IMenuLinkGuard{
    isDisabled(entry: NavEntry): boolean {
      return true;
    }
    isHidden(entry: NavEntry): boolean {
      return true;
    }
  }

  class MockRouter {
    config: Routes = [
      {path: 'home', data: {group: 'test'}},
      {path: 'admin'},
      {path: 'admin/configure'},
      {path: 'admin/storages'},
      {path: 'level'},
      {path: 'level/one'},
      {path: 'level/one/subone'},
      {path: 'level/one/subtwo'},
      {path: 'level/two',canActivate:[MockGuard]}
    ];

    events: Observable<any> = new Observable<any>(() => {
    });

    resetConfig(routes: Routes) {
      this.config = routes;
    }
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule,
        RouterTestingModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        ApplicationInitStatus,
        {provide: Router, useClass: MockRouter},
        NavigatorService,
        MockGuard
      ],
      declarations: [
        MenuComponent, MenuLinkComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
  });


  it('create full menu', () => {
    component.ngOnInit();

    expect(component.tree).to.have.length(3);
    expect(_.map(component.tree, e => e.path)).to.be.deep.eq(['home', 'admin','level']);
    expect(component.tree[1].children).to.have.length(2);
  });


  it('create menu for level is equal 0', () => {
    component.level = 0;
    component.ngOnInit();
    expect(component.tree).to.have.length(3);
    expect(_.map(component.tree, e => e.path)).to.be.deep.eq(['home', 'admin','level']);
    expect(component.tree[1].children).to.have.length(0);
  });


  it('create submenu for base entry is "admin"', () => {
    component.base = 'admin';
    component.ngOnInit();
    expect(component.tree).to.have.length(2);
    expect(_.map(component.tree, e => e.path)).to.be.deep.eq(['admin/configure', 'admin/storages']);
  });

  it('create submenu for base entry is "level/one"', () => {
    component.base = 'level/one';
    component.ngOnInit();
    expect(component.tree).to.have.length(2);
    expect(_.map(component.tree, e => e.path)).to.be.deep.eq(["level/one/subone",
      "level/one/subtwo"]);
  });


  it('create submenu for group "test"', () => {
    component.group = 'test';
    component.ngOnInit();
    expect(component.tree).to.have.length(1);
    expect(_.map(component.tree, e => e.path)).to.be.deep.eq(['home']);
  });


  it('create submenu by own filter function', () => {
    component.filter = (e:NavEntry) => {
      let ret = false;
      if (e.path === 'admin') {
        ret = true;
      }
      return ret;
    };
    component.ngOnInit();
    expect(component.tree).to.have.length(1);
    expect(_.map(component.tree, e => e.path)).to.be.deep.eq(['admin']);
  });

  it('create menu link and test menu guard', async () => {
    component.ngOnInit();
    fixtureLink = TestBed.createComponent(MenuLinkComponent);
    componentLink = fixtureLink.componentInstance;
    componentLink.entry = component.tree[2].children[1];
    expect(await componentLink.isDisabled()).to.be.true;
    expect(await componentLink.isHidden()).to.be.true;

  })


  it.skip('create submenu by with exclude', () => { })

});


