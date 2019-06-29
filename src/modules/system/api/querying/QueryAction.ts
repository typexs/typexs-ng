import {ExprDesc} from 'commons-expressions/browser';


export class QueryAction {


  /**
   * Mango-Query
   */
  readonly mango: ExprDesc;

  /**
   * Mango-Query as JSON
   */
  readonly query: any;

  constructor(q: any) {
    if (q instanceof ExprDesc) {
      this.mango = q;
      this.query = q.toJson();
    } else {
      this.query = q;
    }
  }


}
