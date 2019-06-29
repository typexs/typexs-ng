import * as _ from 'lodash';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Expressions} from 'commons-expressions/browser';

import {IEntityRef} from 'commons-schema-api/browser';
import {TypeOrmSqlConditionsBuilder} from '@typexs/base/libs/storage/framework/typeorm/TypeOrmSqlConditionsBuilder';
import {IConditionJoin} from '@typexs/base/browser';
import {QueryAction} from '../QueryAction';


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

  sqlWhere = '';

  sqlJoins: IConditionJoin[] = [];


  doQuery() {
    if (this.jsonQuery && this.freeTextQueryError.length === 0) {
      this.queryState.emit(new QueryAction(this.jsonQuery));
    }
  }


  doResetQuery() {
    this.queryState.emit(new QueryAction(null));
  }

  onQueryInput($event: any) {
    this.sqlWhere = null;
    this.jsonQuery = null;
    this.freeTextQueryError = [];
    if (!_.isEmpty(this.freeTextQuery)) {
      try {
        const errors: string[] = [];

        const expr = Expressions.parse(this.freeTextQuery);
        if (expr) {
          if (expr.test(this.entityRef.getClassRef(), errors)) {
            this.jsonQuery = expr;
            const builder = new TypeOrmSqlConditionsBuilder(this.entityRef);
            this.sqlWhere = builder.build(this.jsonQuery.toJson());
            this.sqlJoins = builder.getJoins();
          }
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
