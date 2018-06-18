import * as _ from 'lodash';
import {XS_TYPE} from './Constants';


export abstract class XSDef {
  private readonly baseType: XS_TYPE;

  readonly name: string;

  private _options: any = {};

  object: Function = null;

  constructor(type: XS_TYPE, name: string, object: Function = null) {
    this.baseType = type;
    this.name = name;
    this.object = object;
    console.log(this.baseType, this.name, this.object);
  }

  options(opts: any) {
    if (!_.isEmpty(Object.keys(opts))) {
      this._options = opts;
    } else {

    }
  }
}
