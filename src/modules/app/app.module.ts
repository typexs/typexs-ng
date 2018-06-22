import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';
import {XSTestComponent} from '../xsform/xstest.component';
import {XInputComponent} from '../xsform/xinput.component';
import {XFormComponent} from '../xsform/xform.component';


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
