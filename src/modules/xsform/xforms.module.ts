import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {BrowserModule} from '@angular/platform-browser';
import {xFormComponent} from './xform.component';
import {xInputComponent} from './xinput.component';


@NgModule({
  declarations: [
    xFormComponent,
    xInputComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  entryComponents: [
    xFormComponent,
    xInputComponent
  ],
  exports: [
    xFormComponent,
    xInputComponent
  ],
  providers: []
})
export class XFormsModule {
}
