import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {XFORMCOMPONENT} from './xforms.elements';


@NgModule({
  declarations: XFORMCOMPONENT,
  imports: [
    FormsModule,
    BrowserModule
  ],
  entryComponents: XFORMCOMPONENT,
  exports: XFORMCOMPONENT,
  providers: []
})
export class xFormsModule {
}
