import * as _ from 'lodash';
import {NotYetImplementedError} from './NotYetImplementedError';
import {XS_TYPE} from './Constants';


export abstract class XsDef {

  private readonly baseType: XS_TYPE;

  readonly name: string;

  private _options: any = {};

  object: Function = null;

  constructor(type: XS_TYPE, name: string, object: Function = null) {
    this.baseType = type;
    this.name = name;
    this.object = object;
  }

  setOptions(opts: any) {
    if (opts && !_.isEmpty(Object.keys(opts))) {
      this._options = opts;
    } else {

    }
  }

  getOptions(key:string = null) {
    if(key){
      return _.get(this._options,key);
    }
    return this._options;
  }

  abstract id(): string;


}


export class XSEntityDef extends XsDef {

  schemaName: string = 'default';


  constructor(fn: Function) {
    super('entity', fn.name, fn);
  }


  getPropertyDefs(): XSPropertyDef[] {
    return XSRegistry.getPropertyDefsFor(this);
  }

  id(): string {
    return [this.schemaName, this.name].join('--').toLocaleLowerCase();
  }

}

export type XS_DATA_TYPES = 'string' | 'number' | 'entity' | 'array' | 'any' ;

export interface IXsPropertyDef {
  type?: string
  form?: string

}

export class XSPropertyDef extends XsDef {

  schemaName: string = 'default';

  readonly entityName: string;

  readonly dataType: string;

  constructor(fn: Function, propertyName: string, options: IXsPropertyDef = {}) {
    super('property', propertyName, fn);
    this.setOptions(options);
    this.entityName = fn.constructor.name;

    if (options && !options.type) {
      let reflectMetadataType = Reflect && Reflect.getMetadata ? Reflect.getMetadata('design:dataType', fn, propertyName) : undefined;
      if (reflectMetadataType) {
        this.dataType = reflectMetadataType;
      } else {
        // default
        this.dataType = 'string';
//        reflectMetadataType = Reflect && Reflect.getOwnPropertyDescriptor ? Reflect.getOwnPropertyDescriptor(fn, propertyName) : undefined;
//         let value = fn.constructor[propertyName]
//         if(value != undefined){
//           if(_.isString(value)){
//
//           }
//         }

        //
        // }
      }

    }
    //console.log(this.name, this.dataType);
  }

  get label() {
    let label = null;
    let options = this.getOptions();
    if (options.label) {
      label = options.label;
    }

    if(!label){
      label = _.startCase(this.name);
    }else{
      label = "None";
    }
    return label;
  }


  id(): string {
    return [this.schemaName, this.entityName, this.name].join('--').toLocaleLowerCase();
  }

}


export class XSSchemaDef extends XsDef {

  constructor(name: string = 'default') {
    super('schema', name);
  }

  id(): string {
    return [this.name].join('--').toLocaleLowerCase();
  }

}


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

  static register(xsdef: XsDef) {
    if (xsdef instanceof XSEntityDef) {
      this.$()._entities.push(xsdef);
    } else if (xsdef instanceof XSPropertyDef) {
      this.$()._properties.push(xsdef);
    } else {
      throw new NotYetImplementedError();
    }
  }


  static createEntity(fn: Function): XSEntityDef {
    return new XSEntityDef(fn);
  }


  static createProperty(fn: any, propertyName?: string, options: IXsPropertyDef = {}): XSPropertyDef {
    return new XSPropertyDef(fn, propertyName, options);
  }


  static getEntityDefFor(instance: Object | string): XSEntityDef {
    let cName = null;
    if (_.isString(instance)) {
      cName = instance;
    } else {
      cName = instance.constructor.name;
    }

    return _.find(this.$()._entities, {name: cName});
  }


  static getPropertyDefsFor(entity: XSEntityDef) {
    return _.filter(this.$()._properties, {entityName: entity.name});
  }

}


