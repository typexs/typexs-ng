import {Injectable} from '@angular/core';
import {NavigatorService} from '../navigator/navigator.service';


@Injectable()
export class AdminService {
  constructor(private navigator: NavigatorService) {
    // Startup stuff should be done once!
    this.navigator.addGroupEntry('admin/system/*', {label: 'System', group: 'admin'});
  }
}
