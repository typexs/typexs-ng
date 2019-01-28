import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';

import {InputDemoComponent} from './input-demo.component';
import {GroupDemoComponent} from './group-demo.component';
import {ContentDemoComponent} from './content-demo.component';
import {SearchResultComponent} from './search/search-result.component';
import {SearchEntryComponent} from './search/search-entry.component';
import {ViewParentComponent} from './search/view-parent.component';
import {ContentViewChildDemoComponent} from './content-view-child-demo.component';
import {DemosComponent} from './demos.component';
import {CheckboxMatrixDemoComponent} from './checkbox-matrix-demo/checkbox-matrix-demo.component';
import {FORM_COMPONENTS} from '../forms/forms.elements';
import {MenuDemoComponent} from './menu-demo/menu-demo.component';
import {MenuAccessService} from './menu-demo/MenuAccessService';
import {DummyComponent} from './dummy/dummy.component';
import {OptionsService} from './services/OptionsService';
import {PagerDemoComponent} from './pager-demo/pager-demo.component';
import {AuthService} from '../system/api/auth/auth.service';
import {EmbeddedContentComponent} from './embedded-content/embedded-content.component';
import {EmbeddedContentDemoComponent} from './embedded-content/embedded-content-demo.component';
import {EmbeddedContentDirective} from './embedded-content/embedded-content.directive';
import {EmbeddedContent2Component} from './embedded-content/embedded-content-2.component';
import {LogoutComponent} from './dummy/logout/logout.component';
import {ProfileComponent} from './dummy/profile/profile.component';


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
    ContentViewChildDemoComponent,
    MenuDemoComponent,
    DummyComponent,
    PagerDemoComponent,
    EmbeddedContentComponent,
    EmbeddedContentDemoComponent,
    EmbeddedContentDirective,
    EmbeddedContent2Component,
    LogoutComponent,
    ProfileComponent
  ],
  entryComponents: [
    ...FORM_COMPONENTS,
    SearchResultComponent,
    SearchEntryComponent,
    ViewParentComponent
  ],
  imports: APP_MODULES,
  providers: [
    OptionsService,
    MenuAccessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private authService: AuthService) {
    authService.init();
  }
}




