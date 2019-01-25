import {Component, ViewEncapsulation} from '@angular/core';
import {BaseAdminThemeComponent} from '../base_admin_theme/base_admin_theme.component';


@Component({
  templateUrl: '../base_admin_theme/base_admin_theme.component.html',
  styleUrls: ['../base_admin_theme/base_admin_theme.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DemosComponent extends BaseAdminThemeComponent {



  async ngOnInit(): Promise<void> {
    this.menuOptions = {
      base: 'demo',
      group: 'demo'
    }
    this.baseRouterLink = '/demo';
    this.title = 'TypexsNg'
    await super.ngOnInit();
  }
}
