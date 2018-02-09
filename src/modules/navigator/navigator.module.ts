import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NavigatorComponent} from "./navigator.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [NavigatorComponent],
  imports: [BrowserModule,RouterModule],
  exports:[NavigatorComponent],
  providers: []
})
export class NavigatorModule {




}
