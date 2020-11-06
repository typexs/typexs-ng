import {NgModule} from '@angular/core';
import {MenuComponent} from './menu.component';
import {RouterModule} from '@angular/router';
import {NavigatorService} from './navigator.service';
import {MenuLinkComponent} from './menu-link.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [MenuComponent, MenuLinkComponent],
  imports: [CommonModule, RouterModule],
  exports: [MenuComponent, MenuLinkComponent],
  providers: [NavigatorService]
})
export class NavigatorModule {

  static forRoot() {
    return {
      ngModule: NavigatorModule,
      providers: [
        NavigatorService
      ]
    };
  }

}
