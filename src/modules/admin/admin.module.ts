import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin.component";


@NgModule({
  declarations: [AdminComponent],
  imports: [
    RouterModule.forChild([
        {path: 'admin', component: AdminComponent, data: {label: 'admin'}}
      ]
    )],
  exports: []
})
export class AdminModule {


}
