import {
  defaults, find, isArray, isEmpty, isFunction, isNumber, intersection,
  get, clone, upperFirst, isNull, keys, values, isString, filter, merge, isPlainObject,
  concat, kebabCase, has, snakeCase, isRegExp, orderBy, remove, first, set, assign,
  capitalize, isUndefined, isDate
} from 'lodash';
import {Component, Input} from '@angular/core';
import {IGridColumn} from '../../datatable/IGridColumn';
import {IEntityRef} from '@allgemein/schema-api';
import {Expressions} from '@allgemein/expressions';
import {C_ENTITY_REF, C_URL_PREFIX} from '../../constants';
import {UrlHelper} from '../../lib/UrlHelper';


@Component({
  selector: 'txs-simple-html-cell-entity-operations',
  templateUrl: 'simple-html-cell-entity-operations-renderer.component.html'
})
export class SimpleHtmlCellEntityOperationsRendererComponent {

  @Input()
  column: IGridColumn;

  @Input()
  row: any;


  getEntityRef(): IEntityRef {
    return get(this.column, C_ENTITY_REF);
  }

  getUrlPrefix(): string {
    return get(this.column, C_URL_PREFIX);
  }


  buildLookupConditions(res: any) {
    const e = this.getEntityRef();
    return UrlHelper.buildLookupConditions(e, res);
  }




}
