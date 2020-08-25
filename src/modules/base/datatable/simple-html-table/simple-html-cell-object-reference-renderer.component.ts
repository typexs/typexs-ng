import {Component, Input} from '@angular/core';

import * as _ from 'lodash';
import {IGridColumn} from '../../datatable/IGridColumn';
import {IPropertyRef} from 'commons-schema-api/browser';
import {Expressions} from 'commons-expressions';
import {C_PROPERTY, C_URL_PREFIX} from '../../constants';


@Component({
  selector: 'txs-simple-html-cell-object-reference',
  templateUrl: 'simple-html-cell-object-reference-renderer.component.html'
})
export class SimpleHtmlCellObjectReferenceRendererComponent {

  @Input()
  column: IGridColumn;

  @Input()
  row: any;


  getProperty(): IPropertyRef {
    return _.get(this.column, C_PROPERTY);
  }


  getValue() {
    if (this.column.valueHandler) {
      return this.column.valueHandler(this.row);
    } else if (this.getProperty()) {
      return this.getProperty().get(this.row);
    } else if (this.column.field) {
      return _.get(this.row, this.column.field);
    } else {
      return null;
    }
  }



}
