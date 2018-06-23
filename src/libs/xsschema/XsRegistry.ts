import * as _ from 'lodash';
import {NotYetImplementedError} from './NotYetImplementedError';
import {XS_TYPE_CLASS_REF, XS_TYPE_ENTITY, XS_TYPE_PROPERTY, XS_TYPE_SCHEMA} from './Constants';

import {XsSchemaDef} from './XsSchemaDef';
import {XsPropertyDef} from './XsPropertyDef';
import {XsLookupRegistry} from './XsLookupRegistry';
import {XsDef} from './XsDef';
import {XsEntityDef} from './XsEntityDef';
import {IXsProperty} from './IXsProperty';
import {IXsEntity} from './IXsEntity';


export class XsRegistry {


  private static _self: XsRegistry; // = new XsRegistry();

  private _lookup: XsLookupRegistry;


  private constructor() {
    this._lookup = XsLookupRegistry.$();
    let defaultSchema = new XsSchemaDef('default');
    this._lookup.add(XS_TYPE_SCHEMA, defaultSchema);
  }


  static $() {
    if (!this._self) {
      this._self = new XsRegistry();
    }
    return this._self;
  }


  static getSchema(name: string): XsSchemaDef {
    return XsLookupRegistry.$().find(XS_TYPE_SCHEMA, {name: name});
  }

  listProperties() {
    return XsLookupRegistry.$().list(XS_TYPE_PROPERTY);
  }

  listEntities() {
    return XsLookupRegistry.$().list(XS_TYPE_ENTITY);
  }

  listClassRefs() {
    return XsLookupRegistry.$().list(XS_TYPE_CLASS_REF);
  }

  listSchemas() {
    return XsLookupRegistry.$().list(XS_TYPE_SCHEMA);
  }

  static register(xsdef: XsDef): XsDef {
    if (xsdef instanceof XsEntityDef) {
      return this.$()._lookup.add(XS_TYPE_ENTITY, xsdef);
    } else if (xsdef instanceof XsPropertyDef) {
      return this.$()._lookup.add(XS_TYPE_PROPERTY, xsdef);
    } else {
      throw new NotYetImplementedError();
    }
  }


  static createEntity(fn: Function,options:IXsEntity = {}): XsEntityDef {
    return new XsEntityDef(fn,options);
  }


  static createProperty(options: IXsProperty): XsPropertyDef {
    return new XsPropertyDef(options);
  }


  static getEntityDefFor(instance: Object | string): XsEntityDef {
    let cName = null;
    if (_.isString(instance)) {
      cName = instance;
    } else {
      cName = instance.constructor.name;
    }
    return this.$()._lookup.find(XS_TYPE_ENTITY, {name: cName});
  }


  static getPropertyDefsFor(entity: XsEntityDef) {
    return this.$()._lookup.filter(XS_TYPE_PROPERTY, {entityName: entity.name});
  }

  static reset() {
    this._self = null;
  }
}


