import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';
import {XFORMCOMPONENT} from '../xsform/xforms.elements';
import {InputDemoComponent, OptionsService} from './input-demo.component';
import {GroupDemoComponent} from './group-demo.component';
import {ContentDemoComponent} from './content-demo.component';
import {SearchResultComponent} from './search/search-result.component';
import {SearchEntryComponent} from './search/search-entry.component';
import {ViewParentComponent} from './search/view-parent.component';
import {ContentViewChildDemoComponent} from './content-view-child-demo.component';


@NgModule({
  declarations: [
    AppComponent,
    InputDemoComponent,
    GroupDemoComponent,
    ContentDemoComponent,
    SearchResultComponent,
    SearchEntryComponent,
    ViewParentComponent,
    ContentViewChildDemoComponent
  ],
  entryComponents: [...XFORMCOMPONENT,
    SearchResultComponent,
    SearchEntryComponent,
    ViewParentComponent
  ],
  imports: APP_MODULES,
  providers: [
    OptionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}




