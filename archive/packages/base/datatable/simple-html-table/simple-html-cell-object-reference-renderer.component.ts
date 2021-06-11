import {
  defaults, find, isArray, isEmpty, isFunction, isNumber, intersection,
  get, clone, upperFirst, isNull, keys, values, isString, filter, merge, isPlainObject,
  concat, kebabCase, has, snakeCase, isRegExp, orderBy, remove, first, set, assign,
  capitalize, isUndefined, isDate
} from 'lodash';
import {Component, Input} from '@angular/core';


import {IGridColumn} from '../../datatable/IGridColumn';
import {IPropertyRef} from '@allgemein/schema-api';
import {Expressions} from '@allgemein/expressions';
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
    return get(this.column, C_PROPERTY);
  }


  getValue() {
    if (this.column.valueHandler) {
      return this.column.valueHandler(this.row);
    } else if (this.getProperty()) {
      return this.getProperty().get(this.row);
    } else if (this.column.field) {
      return get(this.row, this.column.field);
    } else {
      return null;
    }
  }



}
