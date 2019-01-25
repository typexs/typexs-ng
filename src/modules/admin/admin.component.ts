import {Component, Renderer2, ViewEncapsulation} from '@angular/core';
import {BaseAdminThemeComponent} from '../base_admin_theme/base_admin_theme.component';
import {AuthService} from '../system/api/auth/auth.service';

@Component({
  selector: 'admin',
  templateUrl: '../base_admin_theme/base_admin_theme.component.html',
  styleUrls: ['../base_admin_theme/base_admin_theme.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent extends BaseAdminThemeComponent {



  async ngOnInit(): Promise<void> {
    this.menuOptions = {
      base: 'admin',
      group: 'admin'
    }
    this.baseRouterLink = '/admin';
    await super.ngOnInit();
  }


}
