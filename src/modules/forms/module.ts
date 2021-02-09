import {NgModule} from '@angular/core';
import {FormsModule as NgFormsModule} from '@angular/forms';
import {FORM_COMPONENTS} from './forms.elements';
import {FormService} from './form.service';
import {BaseModule} from '../base/module';
import {CommonModule} from '@angular/common';
import {FORM_ELEMENTS} from '../../libs/forms/elements';
import {AbstractFormComponent} from './component/AbstractFormComponent';
import {FormComponent} from './form.component';
import {InputComponent} from './input.component';
import {LabelComponent} from './label.component';
import {CheckboxComponent} from './checkbox.component';
import {RadioComponent} from './radio.component';
import {SelectComponent} from './select/select.component';
import {GridComponent} from './grid/grid.component';
import {GridRowComponent} from './grid/grid-row.component';
import {GridCellComponent} from './grid/grid-cell.component';


@NgModule({
  declarations: [
    AbstractFormComponent,
    ...FORM_COMPONENTS
  ],
  imports: [
    CommonModule,
    NgFormsModule,
    BaseModule
  ],
  entryComponents: FORM_COMPONENTS,
  exports: FORM_COMPONENTS,
  providers: [
    FormService
  ]
})
export class FormsModule {

  static forRoot() {
    return {
      ngModule: FormsModule,
      providers: [
        FormService
      ]
    };
  }

  constructor() {
    const load = FORM_ELEMENTS;
  }
}
