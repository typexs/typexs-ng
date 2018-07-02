import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';
import {XSTestComponent} from '../xsform/xstest.component';
import {xInputComponent} from '../xsform/xinput.component';
import {xFormComponent} from '../xsform/xform.component';


@NgModule({
  declarations: [
    AppComponent,
    XSTestComponent,
  ],
  entryComponents: [
    xFormComponent,
    xInputComponent
  ],
  imports: APP_MODULES,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
