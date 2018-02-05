import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FirstComponent} from "../components/first/app/first.component";


@NgModule({
  declarations: [
    FirstComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [FirstComponent],
})
export class AppModule { }
