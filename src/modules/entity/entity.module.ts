import {NgModule} from '@angular/core';
import {EntityTypesComponent} from './types/entity-types.component';
import {EntityModifyComponent} from './modify/entity-modify.component';
import {EntityDeleteComponent} from './delete/entity-delete.component';
import {EntityQueryComponent} from './query/entity-query.component';
import {EntityViewComponent} from './view/entity-view.component';
import {EntityStructComponent} from './struct/entity-struct.component';
import {EntityService} from './entity.service';
import {EntityOptionsService} from './entity-options.service';
import {FormsModule} from '../forms/forms.module';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {SystemModule} from '../system/system.module';
import {RouterModule} from '@angular/router';


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
    EntityStructComponent
  ],
  imports: [
    SystemModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [],
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
