import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MenuComponent} from './menu.component';
import {RouterModule} from '@angular/router';
import {NavigatorService} from './navigator.service';


@NgModule({
  declarations: [MenuComponent],
  imports: [BrowserModule, RouterModule],
  exports: [MenuComponent],
  providers: [NavigatorService]
})
export class NavigatorModule {


}
