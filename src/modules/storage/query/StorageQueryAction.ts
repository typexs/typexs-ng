import {ExprDesc} from 'commons-expressions/browser';


export class StorageQueryAction {

  /**
   * Mango-Query as JSON
   */
  readonly query: any;

  constructor(q: any) {
    if (q instanceof ExprDesc) {
      this.query = q.toJson();
    }else{
      this.query = q;
    }
  }



}