import * as _ from 'lodash';
import {XsSchemaDef} from './XsSchemaDef';
import {XsEntityDef} from './XsEntityDef';

export class SchemaUtils {

  static get<X, Y>(property: string, objects: X[]): Y[] {
    let y: Y[] = [];
    for (let object of objects) {
      let values = _.get(object, property);
      y.push(values);
    }

    return y;
  }

  static resolve(schemaDef: XsSchemaDef, entityName: string | XsEntityDef) {
    let entityDef: XsEntityDef = <XsEntityDef>entityName;
    if (_.isString(entityName))
      entityDef = schemaDef.getEntity(entityName);
    return entityDef;
  }


}
