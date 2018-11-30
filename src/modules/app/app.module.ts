import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';

import {InputDemoComponent, OptionsService} from './input-demo.component';
import {GroupDemoComponent} from './group-demo.component';
import {ContentDemoComponent} from './content-demo.component';
import {SearchResultComponent} from './search/search-result.component';
import {SearchEntryComponent} from './search/search-entry.component';
import {ViewParentComponent} from './search/view-parent.component';
import {ContentViewChildDemoComponent} from './content-view-child-demo.component';
import {DemosComponent} from './demos.component';
import {CheckboxMatrixDemoComponent} from './checkbox-matrix-demo/checkbox-matrix-demo.component';
import {FORM_COMPONENTS} from '../forms/forms.elements';


@NgModule({
  declarations: [
    AppComponent,
    DemosComponent,
    InputDemoComponent,
    GroupDemoComponent,
    CheckboxMatrixDemoComponent,
    ContentDemoComponent,
    SearchResultComponent,
    SearchEntryComponent,
    ViewParentComponent,
    ContentViewChildDemoComponent
  ],
  entryComponents: [
    ...FORM_COMPONENTS,
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




