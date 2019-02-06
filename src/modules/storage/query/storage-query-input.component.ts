import * as _ from 'lodash';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Expressions} from 'commons-expressions/browser';

import {StorageQueryAction} from './StorageQueryAction';

import {IEntityRef} from 'commons-schema-api/browser';
import {TypeOrmSqlConditionsBuilder} from '@typexs/base/libs/storage/framework/typeorm/TypeOrmSqlConditionsBuilder';
import {IConditionJoin} from '@typexs/base/browser';


@Component({
  selector: 'txs-storage-query-input',
  templateUrl: './storage-query-input.component.html',
  styleUrls: ['./storage-query-input.component.scss']
})
export class StorageQueryInputComponent {

  @Input()
  entityDef: IEntityRef;

  @Output()
  queryState: EventEmitter<StorageQueryAction> = new EventEmitter();

  freeTextQuery: string = '';

  freeTextQueryError: string[] = [];

  jsonQuery: any = null;

  sqlWhere: string = '';

  sqlJoins: IConditionJoin[] = [];


  doQuery() {
    if (this.jsonQuery && this.freeTextQueryError.length == 0) {
      this.queryState.emit(new StorageQueryAction(this.jsonQuery));
    }
  }


  doResetQuery() {
    this.queryState.emit(new StorageQueryAction(null));
  }

  onQueryInput($event: any) {
    this.sqlWhere = null;
    this.jsonQuery = null;
    this.freeTextQueryError = [];
    if (!_.isEmpty(this.freeTextQuery)) {
      try {
        let errors: string[] = [];

        let expr = Expressions.parse(this.freeTextQuery);
        if (expr) {
          if (expr.test(this.entityDef.getClassRef(), errors)) {
            this.jsonQuery = expr;
            let builder = new TypeOrmSqlConditionsBuilder(this.entityDef);
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
