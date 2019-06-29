import {Component, Input} from '@angular/core';
import {IGridColumn} from '../IGridColumn';
import * as _ from 'lodash';


@Component({
  selector: 'txs-simple-html-cell-value',
  template: '{{ getValue() }}'
})
export class SimpleHtmlCellValueComponent {

  @Input()
  column: IGridColumn;

  @Input()
  row: any;


  getValue() {
    if (this.column.valueHandler) {
      return this.column.valueHandler(this.row);
    } else if (this.column.field) {
      return _.get(this.row, this.column.field);
    } else {
      return null;
    }
  }


}
