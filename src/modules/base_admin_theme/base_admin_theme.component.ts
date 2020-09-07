import * as _ from 'lodash';
import {Component, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewEncapsulation} from '@angular/core';
import {IUser} from '../../libs/api/auth/IUser';
import {AuthService} from '../base/api/auth/auth.service';
import PerfectScrollbar from 'perfect-scrollbar';
import {IMenuOptions} from '../navigator/IMenuOptions';
import {AppService} from '../base/app.service';
import {NavigatorService} from '../navigator/navigator.service';
import {CTXT_ROUTE_USER_LOGOUT, CTXT_ROUTE_USER_PROFILE} from '../base/constants';
import {LogMessage} from '../base/messages/types/LogMessage';
import {INotifyOptions} from './components/notifications/INotifyOptions';
import {NotificationsService} from './components/notifications/notifications.service';
import {Subscription} from 'rxjs/Subscription';
import {BackendClientService} from '../base/backend-client.service';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SystemInfoService} from '../base/system-info.service';

@Component({
  selector: 'bat-admin-layout',
  templateUrl: './base_admin_theme.component.html',
  styleUrls: ['./base_admin_theme.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseAdminThemeComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('content')
  ref: TemplateRef<any>;

  @Input()
  title = 'TypeXs';

  @Input()
  menuOptions: IMenuOptions = {};

  @Input()
  notifyOptions: INotifyOptions = {
    displayTime: 5000,
    maxAlerts: 5
  };

  @Input()
  baseRouterLink = '/';

  @Input()
  userRouterLinks: { profile: string, logout: string } = {profile: 'user/profile', logout: 'user/logout'};

  user: IUser;

  menuScrollBar: PerfectScrollbar;

  viewContext: string;

  private initSubscription: Subscription;

  private userChannelSubscription: Subscription;

  constructor(public authService: AuthService,
              public renderer: Renderer2,
              public backendService: BackendClientService,
              public appStateService: AppService,
              public systemService: SystemInfoService,
              private navigatorService: NavigatorService,
              private notifyService: NotificationsService) {

    appStateService.getViewContext().subscribe(x => this.viewContext = x);
    appStateService.getLogService().subscribe(this.onLogMessage.bind(this));


  }


  onLogMessage(log: LogMessage) {
    if (!log) {
      return;
    }

    if (log.isErrorMessage()) {
      console.error(log.error);
    }
    this.notifyService.addMessage(log);
  }


  getUser() {
    return this.authService.getUser();
  }


  async ngOnInit() {
    this.systemService.refresh();
    this.authService.isInitialized()
      .pipe(switchMap(x => {
        if (x) {
          return this.authService.isLoggedIn();
        } else {
          return of(x);
        }
      }))
      .pipe(switchMap(x => {
        if (x) {
          return this.getUser();
        } else {
          return of(false);
        }
      }))
      .subscribe(x => {
        if (x && !_.isBoolean(x)) {
          this.user = x;
        }
      }, error => console.error(error));

    let entry = this.navigatorService.getEntryByContext(CTXT_ROUTE_USER_PROFILE);
    if (entry) {
      this.userRouterLinks.profile = '/' + entry.getFullPath();
    }
      entry = this.navigatorService.getEntryByContext(CTXT_ROUTE_USER_LOGOUT);
    if (entry) {
      this.userRouterLinks.logout = '/' + entry.getFullPath();
    }
    await this.enableMenuScrollBar();
  }


  ngOnDestroy(): void {
    if (this.userChannelSubscription) {
      this.userChannelSubscription.unsubscribe();
    }
    if (this.initSubscription) {
      this.initSubscription.unsubscribe();
    }
  }


  async enableMenuScrollBar() {
    const _$ = document.querySelector;
    const classList = document.querySelector('.txs-navbar').classList;
    if (!classList.contains('theme-horizontal')) {
      const minScrollbarLength = 40;
      const minScrollbarYOffset = 0;
      const vw = window.innerWidth;
      if (vw < 992 || classList.contains('menupos-static')) {
        this.menuScrollBar = new PerfectScrollbar('.navbar-content', {
          wheelSpeed: .5,
          swipeEasing: false,
          suppressScrollX: true,
          wheelPropagation: true,
          minScrollbarLength: minScrollbarLength,
          scrollYMarginOffset: minScrollbarYOffset

        });
      } else {
        this.menuScrollBar = new PerfectScrollbar('.navbar-content', {
          wheelSpeed: .5,
          swipeEasing: false,
          suppressScrollX: true,
          wheelPropagation: true,
          minScrollbarLength: minScrollbarLength,
          scrollYMarginOffset: minScrollbarYOffset
        });
      }
    }

  }


  togglemenu() {
    const vw = window.innerWidth;
    const elem = document.querySelector('.txs-navbar');
    const classList = elem.classList;
    if (classList.contains('theme-horizontal') === false) {
      if (vw <= 1200 && vw >= 992) {
        this.renderer.addClass(elem, 'navbar-collapsed');
      }
      if (vw < 992) {
        this.renderer.removeClass(elem, 'navbar-collapsed');
      }
    }
  }


}
