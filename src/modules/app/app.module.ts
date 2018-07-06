import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';
import {XFORMCOMPONENT} from '../xsform/xforms.elements';
import {XSTestComponent} from './xstest.component';


@NgModule({
  declarations: [
    AppComponent, XSTestComponent
  ],
  entryComponents: XFORMCOMPONENT,
  imports: APP_MODULES,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}



