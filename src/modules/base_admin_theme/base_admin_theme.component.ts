import {AfterViewInit, Component, Input, OnInit, Renderer2, TemplateRef, ViewEncapsulation} from '@angular/core';
import {IUser} from '../../libs/api/auth/IUser';
import {AuthService} from '../system/api/auth/auth.service';
import PerfectScrollbar from 'perfect-scrollbar';
import {IMenuOptions} from '../navigator/IMenuOptions';
import {AppStateService} from '../system/app.state.service';
import {NavigatorService} from '../navigator/navigator.service';
import {CTXT_ROUTE_USER_LOGOUT, CTXT_ROUTE_USER_PROFILE} from '../system/constants';

@Component({
  selector: 'bat-admin-layout',
  templateUrl: './base_admin_theme.component.html',
  // styleUrls: ['./base_admin_theme.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseAdminThemeComponent implements OnInit, AfterViewInit {

  @Input('content')
  ref: TemplateRef<any>;

  @Input()
  title: string = 'TypeXs';

  @Input()
  menuOptions: IMenuOptions = {};

  @Input()
  baseRouterLink: string = '/';

  @Input()
  userRouterLinks: { profile: string, logout: string } = {profile: 'user/profile', logout: 'user/logout'};

  user: IUser;

  menuScrollBar: PerfectScrollbar;

  constructor(public authService: AuthService,
              public renderer: Renderer2,
              public appStateService: AppStateService,
              private navigatorService: NavigatorService) {
  }


  async getUser(): Promise<IUser> {
    return await this.authService.getUser();
  }


  async ngOnInit() {
    try {
      this.user = await this.getUser();
    } catch (e) {
      console.error(e);
    }
    let entry = this.navigatorService.getEntryByContext(CTXT_ROUTE_USER_PROFILE);
    if(entry){
      this.userRouterLinks.profile = entry.getFullPath();
    }
    entry = this.navigatorService.getEntryByContext(CTXT_ROUTE_USER_LOGOUT);
    if(entry){
      this.userRouterLinks.logout = entry.getFullPath();
    }
  }

  async ngAfterViewInit() {
    await this.enableMenuScrollBar();
  }


  async enableMenuScrollBar() {
    const _$ = document.querySelector;
    let classList = document.querySelector('.txs-navbar').classList;
    if (!classList.contains('theme-horizontal')) {
      const minScrollbarLength = 40;
      let vw = window.innerWidth;
      if (vw < 992 || classList.contains('menupos-static')) {
        this.menuScrollBar = new PerfectScrollbar('.navbar-content', {
          wheelSpeed: .5,
          swipeEasing: false,
          suppressScrollX: true,
          wheelPropagation: true,
          minScrollbarLength: minScrollbarLength,

        });
      } else {
        this.menuScrollBar = new PerfectScrollbar('.navbar-content', {
          wheelSpeed: .5,
          swipeEasing: false,
          suppressScrollX: true,
          wheelPropagation: true,
          minScrollbarLength: minScrollbarLength,
        });
      }
    }

  }


  togglemenu() {
    let vw = window.innerWidth;
    let elem = document.querySelector('.txs-navbar');
    let classList = elem.classList;
    if (classList.contains('theme-horizontal') == false) {
      if (vw <= 1200 && vw >= 992) {
        this.renderer.addClass(elem, 'navbar-collapsed');
      }
      if (vw < 992) {
        this.renderer.removeClass(elem, 'navbar-collapsed');
      }
    }
  }


}
