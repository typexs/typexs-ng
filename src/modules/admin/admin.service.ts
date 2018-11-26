import {Injectable} from '@angular/core';
import {NavigatorService} from '../navigator/navigator.service';
import {AuthService} from '../system/api/auth/auth.service';



@Injectable()
export class AdminService {

  constructor(private navigator: NavigatorService, private authService: AuthService<any>) {
    // Startup stuff should be done once!
    this.navigator.addGroupEntry('admin/system/.*', {label: 'System', group: 'admin'});
    this.navigator.addGroupEntry('admin/ng/.*', {label: 'Angular', group: 'admin'});
    this.navigator.addGroupEntry('admin/entity/.*', {label: 'Entity', group: 'admin'});
  }

  getNavigatorService() {
    return this.navigator;
  }

  getAuthService() {
    return this.authService;
  }
}
