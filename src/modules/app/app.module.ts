import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';
import {XSTestComponent} from '../xform/xstest.component';
import {XInputComponent} from '../xform/xinput.component';
import {XFormComponent} from '../xform/xform.component';


@NgModule({
  declarations: [
    AppComponent,
    XSTestComponent,

  ],
  entryComponents: [
    XFormComponent,
    XInputComponent
  ],
  imports: APP_MODULES,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
