import * as _ from 'lodash';
import {Component, Input} from '@angular/core';
import {IGridColumn} from '../../../system/datatable/IGridColumn';
import {IPropertyRef} from 'commons-schema-api/browser';
import {Expressions} from 'commons-expressions/browser';
import {C_PROPERTY, C_URL_PREFIX} from '../../../system/constants';


@Component({
  selector: 'txs-simple-html-cell-entity-reference',
  templateUrl: 'simple-html-cell-entity-reference-renderer.component.html'
})
export class SimpleHtmlCellEntityReferenceRendererComponent {

  @Input()
  column: IGridColumn;

  @Input()
  row: any;


  getProperty(): IPropertyRef {
    return _.get(this.column, C_PROPERTY);
  }

  getUrlPrefix(): string {
    return _.get(this.column, C_URL_PREFIX);
  }

  isEmpty() {
    return !this.getValue();
  }


  buildLookupConditions(res: any) {
    const e = this.getProperty().getEntityRef();
    return Expressions.buildLookupConditions(e, res);
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

  /**
   * Label for referenced entities
   *
   * @param x
   * @param entity
   */
  labelHandler(entity: any) {
    if (entity['label'] && _.isFunction(entity['label'])) {
      return entity['label']();
    }
    const idProps = this.getProperty().getEntityRef().getPropertyRefs().filter(_x => _x.isIdentifier());
    return idProps.map(k => _.get(entity, k.name)).join(' ');
  }


}
