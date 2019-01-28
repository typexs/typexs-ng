import {Injectable} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";



import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable"
import {AuthService} from './api/auth/auth.service';
import {MessageService} from './messages/message.service';
import {AuthMessage} from './messages/types/AuthMessage';


@Injectable()
export class AppStateService {

  _isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  viewMode: string = 'login';

  adminUrl: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService
             /* private systemInfo:SystemInfoService,
              private route: ActivatedRoute*/
             ) {

    authService.getChannel().subscribe(this.onMessage.bind(this));
    router.events.subscribe(e => {

      if (e instanceof NavigationEnd) {
        this.adminUrl = e.urlAfterRedirects.startsWith('/admin');
        if (this._isAdmin.value && this.adminUrl) {
          if (this.viewMode != 'admin') {
            this.viewMode = 'admin';
          }
        }
        if (this.viewMode == 'admin' && !this.adminUrl) {
          this.viewMode = 'default';
        }

      }
    })

  }


  isAuthenticated() {
    return this.authService.isLoggedIn();
  }


  async onMessage(m: any) {
    if (m instanceof AuthMessage) {
      if (this.authService.isLoggedIn()) {
        let isAdmin = await this.authService.hasRole('admin');
        this._isAdmin.next(isAdmin);
        if (this.adminUrl && this.viewMode != 'admin') {
          this.viewMode = 'admin';
        } else {
          this.viewMode = 'default';
        }
      } else {
        this.viewMode = 'login';
        this._isAdmin.next(false);
      }
    }
  }


  get isAdmin(): Observable<boolean> {
    return this._isAdmin.asObservable();
  }

}
