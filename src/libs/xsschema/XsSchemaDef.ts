import {XsDef} from './XsDef';
import {XsLookupRegistry} from './XsLookupRegistry';
import {XS_TYPE_ENTITY} from './Constants';
import {XsEntityDef} from './XsEntityDef';


export class XsSchemaDef extends XsDef {

  idKeys = ['name'];

  constructor(name: string = 'default') {
    super('schema', name);
  }


  getEntity(name: string):XsEntityDef {
    return XsLookupRegistry.$().find(XS_TYPE_ENTITY, {schemaName: this.name, name: name});
  }


  getEntities():XsEntityDef[] {
    return XsLookupRegistry.$().filter(XS_TYPE_ENTITY, {schemaName: this.name});
  }


}
