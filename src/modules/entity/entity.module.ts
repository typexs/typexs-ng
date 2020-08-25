import {NgModule} from '@angular/core';
import {EntityTypesComponent} from './types/entity-types.component';
import {EntityModifyComponent} from './modify/entity-modify.component';
import {EntityDeleteComponent} from './delete/entity-delete.component';
import {EntityQueryComponent} from './query/page/entity-query.component';
import {EntityViewComponent} from './view/entity-view.component';
import {EntityStructComponent} from './struct/entity-struct.component';
import {EntityService} from './entity.service';
import {EntityOptionsService} from './entity-options.service';
import {FormsModule} from '../forms/module';
import {BrowserModule} from '@angular/platform-browser';
import {BaseModule} from '../base/module';
import {RouterModule} from '@angular/router';
import {FormsModule as NgFormsModule} from '@angular/forms';
import {EntityQueryEmbeddedComponent} from './query/embedded/entity-query-embedded.component';

export const ENTITY_OPTIONS_SERVICE = 'EntityOptionsService';

const PROVIDERS = [
  EntityService,
  EntityOptionsService,
  {provide: ENTITY_OPTIONS_SERVICE, useClass: EntityOptionsService}
];

@NgModule({
  declarations: [
    EntityTypesComponent,
    EntityModifyComponent,
    EntityDeleteComponent,
    EntityQueryComponent,
    EntityViewComponent,
    EntityStructComponent,
    EntityQueryEmbeddedComponent
  ],
  entryComponents: [
    EntityQueryEmbeddedComponent
  ],
  imports: [
    BaseModule,
    BrowserModule,
    RouterModule,
    NgFormsModule,
    FormsModule
  ],
  exports: [
    EntityTypesComponent,
    EntityModifyComponent,
    EntityDeleteComponent,
    EntityQueryComponent,
    EntityViewComponent,
    EntityStructComponent
  ],
  providers: PROVIDERS
})
export class EntityModule {

  static forRoot() {
    return {
      ngModule: EntityModule,
      providers: PROVIDERS
    };
  }

}
