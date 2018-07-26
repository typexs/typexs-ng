import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';
import {XFORMCOMPONENT} from '../xsform/xforms.elements';
import {InputDemoComponent, OptionsService} from './input-demo.component';
import {GroupDemoComponent} from './group-demo.component';
import {ContentDemoComponent} from './content-demo.component';
import {SearchResultComponent} from './search/search-result.component';
import {ContentBuilderComponent} from './search/content-builder.component';
import {SearchEntryComponent} from './search/search-entry.component';


@NgModule({
  declarations: [
    AppComponent,
    InputDemoComponent,
    GroupDemoComponent,
    ContentDemoComponent,
    ContentBuilderComponent,
    SearchResultComponent,
    SearchEntryComponent
  ],
  entryComponents: [...XFORMCOMPONENT, SearchResultComponent,SearchEntryComponent],
  imports: APP_MODULES,
  providers: [
    OptionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}




