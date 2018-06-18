import {XSDef} from './XSDef';

export class XSPropertyDef extends XSDef {

  schemaName: string = 'default';

  readonly entityName: string;

  constructor(fn: Function, method: string) {
    super('property', method, fn);
    this.entityName = fn.constructor.name;
  }

}
