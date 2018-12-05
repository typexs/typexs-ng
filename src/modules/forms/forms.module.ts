import {NgModule} from '@angular/core';
import {FormsModule as NgFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FORM_COMPONENTS} from './forms.elements';
import {FormService} from './form.service';
import {SystemModule} from '../system/system.module';


@NgModule({
  declarations: FORM_COMPONENTS,
  imports: [
    NgFormsModule,
    BrowserModule,
    SystemModule
  ],
  entryComponents: FORM_COMPONENTS,
  exports: FORM_COMPONENTS,
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
