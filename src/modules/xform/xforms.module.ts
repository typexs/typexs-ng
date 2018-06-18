import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {XInputComponent} from './xinput.component';
import {BrowserModule} from '@angular/platform-browser';
import {XFormComponent} from './xform.component';


@NgModule({
  declarations: [
    XFormComponent,
    XInputComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  entryComponents:[
    XFormComponent,
    XInputComponent
  ],
  exports:[
    XFormComponent,
    XInputComponent

  ],
  providers: []
})
export class XFormsModule {
}
