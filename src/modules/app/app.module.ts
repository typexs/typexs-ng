import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';
import {XFORMCOMPONENT} from '../xsform/xforms.elements';
import {InputDemoComponent, OptionsService} from './input-demo.component';
import {GroupDemoComponent} from './group-demo.component';


@NgModule({
  declarations: [
    AppComponent,
    InputDemoComponent,
    GroupDemoComponent
  ],
  entryComponents: XFORMCOMPONENT,
  imports: APP_MODULES,
  providers: [
    OptionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}



