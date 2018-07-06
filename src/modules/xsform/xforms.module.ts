import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {XFORMCOMPONENT} from './xforms.elements';
import {FormService} from './form.service';


@NgModule({
  declarations: XFORMCOMPONENT,
  imports: [
    FormsModule,
    BrowserModule
  ],
  entryComponents: XFORMCOMPONENT,
  exports: XFORMCOMPONENT,
  providers: [
    FormService
  ]
})
export class xFormsModule {
}
