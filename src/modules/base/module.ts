import {ModuleWithProviders, NgModule} from '@angular/core';
import {SystemInfoService} from './system-info.service';
import {DefaultAuthGuardService} from './api/auth/default-auth-guard.service';
import {NoopAuthService} from './api/auth/noop-auth.service';
import {AuthService} from './api/auth/auth.service';
import {AuthGuardService} from './api/auth/auth-guard.service';
import {MessageService} from './messages/message.service';
import {AlertComponent} from './messages/alert.component';
import {BrowserModule} from '@angular/platform-browser';
import {PagerComponent} from './pager/pager.component';
import {PagerService} from './pager/PagerService';
import {AppService} from './app.service';
import {InvokerService} from './invoker.service';
import {BackendClientService} from './backend-client.service';
import {DatatableComponent} from './datatable/datatable.component';
import {SimpleHtmlTableComponent} from './datatable/simple-html-table/simple-html-table.component';
import {SimpleHtmlCellComponent} from './datatable/simple-html-table/simple-html-cell.component';
import {SimpleHtmlCellValueComponent} from './datatable/simple-html-table/simple-html-cell-value.component';
import {
  C_DEFAULT,
  CC_GRID,
  CC_GRID_CELL_ENTITY_OPERATIONS,
  CC_GRID_CELL_ENTITY_REFERENCE,
  CC_GRID_CELL_OBJECT_REFERENCE,
  CC_GRID_CELL_ROUTER_LINK,
  CC_GRID_CELL_VALUE,
  SIMPLE_TABLE
} from './constants';
import {FormsModule} from '@angular/forms';
import {SimpleHtmlCellEntityReferenceRendererComponent} from './datatable/simple-html-table/simple-html-cell-entity-reference-renderer.component';
import {SimpleHtmlCellObjectReferenceRendererComponent} from './datatable/simple-html-table/simple-html-cell-object-reference-renderer.component';
import {SimpleHtmlCellEntityOperationsRendererComponent} from './datatable/simple-html-table/simple-html-cell-entity-operations-renderer.component';
import {RouterModule} from '@angular/router';
import {FreeQueryInputComponent} from './api/querying/free-query/free-query-input.component';
import {SimpleHtmlCellRouterLinkRendererComponent} from './datatable/simple-html-table/simple-html-cell-router-link-renderer.component';


const PROVIDERS = [
  MessageService,
  BackendClientService,
  SystemInfoService,
  AuthService,
  AuthGuardService,
  {provide: AuthService, useClass: NoopAuthService},
  {provide: AuthGuardService, useClass: DefaultAuthGuardService},
  AppService,
  PagerService,
  InvokerService
];

const COMPONENTS = [
  AlertComponent,
  PagerComponent,
  DatatableComponent,
  SimpleHtmlTableComponent,
  SimpleHtmlCellComponent,
  SimpleHtmlCellValueComponent,
  SimpleHtmlCellEntityReferenceRendererComponent,
  SimpleHtmlCellObjectReferenceRendererComponent,
  SimpleHtmlCellEntityOperationsRendererComponent,
  SimpleHtmlCellRouterLinkRendererComponent,
  FreeQueryInputComponent
];


@NgModule({
  declarations: COMPONENTS,
  entryComponents: [
    SimpleHtmlTableComponent,
    SimpleHtmlCellComponent,
    SimpleHtmlCellValueComponent,
    SimpleHtmlCellEntityReferenceRendererComponent,
    SimpleHtmlCellObjectReferenceRendererComponent,
    SimpleHtmlCellEntityOperationsRendererComponent,
    SimpleHtmlCellRouterLinkRendererComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  exports: COMPONENTS,
  providers: PROVIDERS
})
export class BaseModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseModule,
      providers: PROVIDERS
    };
  }

  /**
   * declaring default parameters
   *
   * @param appConfig
   */
  constructor(private appConfig: AppService) {
    appConfig.setComponentClass([C_DEFAULT, CC_GRID], SimpleHtmlTableComponent);
    appConfig.setComponentClass([SIMPLE_TABLE, CC_GRID_CELL_VALUE], SimpleHtmlCellValueComponent);
    appConfig.setComponentClass([SIMPLE_TABLE, CC_GRID_CELL_ENTITY_REFERENCE], SimpleHtmlCellEntityReferenceRendererComponent);
    appConfig.setComponentClass([SIMPLE_TABLE, CC_GRID_CELL_OBJECT_REFERENCE], SimpleHtmlCellObjectReferenceRendererComponent);
    appConfig.setComponentClass([SIMPLE_TABLE, CC_GRID_CELL_ENTITY_OPERATIONS], SimpleHtmlCellEntityOperationsRendererComponent);
    appConfig.setComponentClass([SIMPLE_TABLE, CC_GRID_CELL_ROUTER_LINK], SimpleHtmlCellRouterLinkRendererComponent);

    this.appConfig.getBackendClient().check();
  }

}
