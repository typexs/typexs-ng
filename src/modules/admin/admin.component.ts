import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppService} from '../base/app.service';
import {UI_ADMIN_LAYOUT} from './lib/Constants';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {

  @Input()
  enableLayout: boolean = true;

  constructor(private appService: AppService) {
    this.enableLayout = this.appService.getSettings(UI_ADMIN_LAYOUT, true);
  }

}
