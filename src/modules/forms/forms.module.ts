import {NgModule} from '@angular/core';
import {FormsModule as NgFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {XFORMCOMPONENT} from './xforms.elements';
import {FormService} from './form.service';


@NgModule({
  declarations: XFORMCOMPONENT,
  imports: [
    NgFormsModule,
    BrowserModule
  ],
  entryComponents: XFORMCOMPONENT,
  exports: XFORMCOMPONENT,
  providers: [
    FormService
  ]
})
export class FormsModule {

  static forRoot() {
    return {
      ngModule: FormsModule,
      providers: [
        FormService
      ]
    };
  }
}
