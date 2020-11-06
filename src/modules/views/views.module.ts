import {NgModule} from '@angular/core';
import {ViewBuilderComponent} from './view-builder.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [ViewBuilderComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [],
  exports: [ViewBuilderComponent],
  providers: []
})
export class ViewsModule {
}
