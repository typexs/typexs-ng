import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';
import {XFORMCOMPONENT} from '../xsform/xforms.elements';
import {InputDemoComponent} from './input-demo.component';


@NgModule({
  declarations: [
    AppComponent, InputDemoComponent
  ],
  entryComponents: XFORMCOMPONENT,
  imports: APP_MODULES,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}



