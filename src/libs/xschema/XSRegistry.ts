
import * as _ from 'lodash';
import {XSSchemaDef} from './XSSchemaDef';
import {XSPropertyDef} from './XSPropertyDef';
import {XSDef} from './XSDef';
import {XSEntityDef} from './XSEntityDef';
import {NotYetImplementedError} from './NotYetImplementedError';

export class XSRegistry {

  private _schemas: XSSchemaDef[] = [new XSSchemaDef()];

  private _entities: XSEntityDef[] = [];

  private _properties: XSPropertyDef[] = [];

  private constructor() {
  }

  private static _self = new XSRegistry();

  static $() {
    return this._self;
  }

  static register(xsdef: XSDef) {
    if (xsdef instanceof XSEntityDef) {
      this.$()._entities.push(xsdef);

      xsdef.props = _.filter(this.$()._properties, {entityName: xsdef.name /*,schemaName:xsdef.schemaName*/});

    } else if (xsdef instanceof XSPropertyDef) {
      this.$()._properties.push(xsdef);
    } else {
      throw new NotYetImplementedError();
    }
  }


  static createEntity(fn: Function): XSEntityDef {
    return new XSEntityDef(fn);
  }

  static createProperty(fn: any, propertyName?: string): XSPropertyDef {
    return new XSPropertyDef(fn, propertyName);
  }


  static getEntityDefFor(instance: Object): XSEntityDef {
    let cName = instance.constructor.name;
    return _.find(this.$()._entities, {name: cName});
  }


  static getPropertyDefsFor(entity: XSEntityDef) {
    return _.filter(this.$()._properties, {entityName: entity.name});
  }

}
