import * as _ from 'lodash';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Expressions} from '@typexs/schema/libs/expressions/Expressions';
import {IConditionJoin, SqlConditionsBuilder} from '@typexs/schema/libs/framework/typeorm/SqlConditionsBuilder';
import {EntityQueryAction} from './EntityQueryAction';
import {EntityDef} from '@typexs/schema/browser';


@Component({
  selector: 'txs-entity-query-input',
  templateUrl: './entity-query-input.component.html',
  styleUrls: ['./entity-query-input.component.scss']
})
export class EntityQueryInputComponent  {

  @Input()
  entityDef:EntityDef;

  @Output()
  queryState: EventEmitter<EntityQueryAction> = new EventEmitter();

  freeTextQuery: string = '';

  freeTextQueryError: string[] = [];

  jsonQuery: any = null;

  sqlWhere: string = '';

  sqlJoins: IConditionJoin[] = [];


  doQuery() {
    if(this.jsonQuery && this.freeTextQueryError.length == 0){
      this.queryState.emit(new EntityQueryAction(this.jsonQuery));
    }
  }


  doResetQuery() {
    this.queryState.emit(new EntityQueryAction(null));
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
            let builder = new SqlConditionsBuilder(this.entityDef);
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
