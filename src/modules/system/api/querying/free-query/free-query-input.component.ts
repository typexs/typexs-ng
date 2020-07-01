import * as _ from 'lodash';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Expressions} from 'commons-expressions/browser';

import {IEntityRef} from 'commons-schema-api/browser';
import {TypeOrmSqlConditionsBuilder} from '@typexs/base/libs/storage/framework/typeorm/TypeOrmSqlConditionsBuilder';
import {IConditionJoin} from '@typexs/base/browser';
import {QueryAction} from '../QueryAction';
import Timeout = NodeJS.Timeout;


@Component({
  selector: 'txs-free-query-input',
  templateUrl: './free-query-input.component.html',
  styleUrls: ['./free-query-input.component.scss']
})
export class FreeQueryInputComponent {

  @Input()
  entityRef: IEntityRef;

  @Output()
  queryState: EventEmitter<QueryAction> = new EventEmitter();

  freeTextQuery = '';

  freeTextQueryError: string[] = [];

  jsonQuery: any = null;

  // sqlWhere = '';
  //
  // sqlJoins: IConditionJoin[] = [];

  timeout: Timeout;

  enabled: boolean = false;

  doQuery() {
    if (this.jsonQuery && this.freeTextQueryError.length === 0) {
      this.queryState.emit(new QueryAction(this.jsonQuery));
    }
  }


  doResetQuery() {
    this.queryState.emit(new QueryAction(null));
  }

  onQueryInput($event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.build.bind(this), 300);
  }

  build() {
    this.freeTextQueryError = [];
    if (!_.isEmpty(this.freeTextQuery)) {
      try {
        const errors: string[] = [];

        const expr = Expressions.parse(this.freeTextQuery);
        if (expr) {
          this.jsonQuery = expr;
          this.freeTextQueryError = errors;
        } else {
          this.freeTextQueryError.push('no parseable data');
        }
      } catch (e) {
        this.freeTextQueryError.push(e.message);
      }
    }
  }
}
