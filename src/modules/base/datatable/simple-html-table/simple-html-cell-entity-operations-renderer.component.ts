import * as _ from 'lodash';
import {Component, Input} from '@angular/core';
import {IGridColumn} from '../../datatable/IGridColumn';
import {IEntityRef} from 'commons-schema-api/browser';
import {Expressions} from 'commons-expressions/browser';
import {C_ENTITY_REF, C_URL_PREFIX} from '../../constants';


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
    return _.get(this.column, C_ENTITY_REF);
  }

  getUrlPrefix(): string {
    return _.get(this.column, C_URL_PREFIX);
  }


  buildLookupConditions(res: any) {
    const e = this.getEntityRef();
    return Expressions.buildLookupConditions(e, res);
  }


}
