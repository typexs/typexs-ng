import {XSDef} from './XSDef';
import {XSPropertyDef} from './XSPropertyDef';
// import {XSRegistry} from './XSRegistry';

export class XSEntityDef extends XSDef {

  schemaName: string = 'default';

  props:XSPropertyDef[] = [];

  constructor(fn: Function) {
    super('entity', fn.name, fn);
  }


  getPropertyDefs(): XSPropertyDef[] {
    return this.props;
  }

}
