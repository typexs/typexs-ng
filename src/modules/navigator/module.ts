import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MenuComponent} from './menu.component';
import {RouterModule} from '@angular/router';
import {NavigatorService} from './navigator.service';
import {MenuLinkComponent} from './menu-link.component';


@NgModule({
  declarations: [MenuComponent, MenuLinkComponent],
  imports: [BrowserModule, RouterModule],
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
