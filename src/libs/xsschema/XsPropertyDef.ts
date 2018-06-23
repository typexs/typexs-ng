import * as _ from 'lodash';
import {XsDef} from './XsDef';
import {IXsProperty} from './IXsProperty';
import {XsClassRef} from './XsClassRef';
import {XsLookupRegistry} from './XsLookupRegistry';
import {XsEntityDef} from './XsEntityDef';
import {XS_TYPE_ENTITY, XS_TYPE_PROPERTY} from './Constants';
import {NotYetImplementedError} from './NotYetImplementedError';

export class XsPropertyDef extends XsDef {

  idKeys = ['schemaName', 'entityName', 'name'];

  schemaName: string = 'default';

  readonly cardinality: number = 1;

  readonly entityName: string;

  readonly dataType: string;

  readonly targetRef: XsClassRef = null;

  readonly propertyRef: XsClassRef = null;

  readonly identifier: boolean;

  readonly generated: boolean;

  constructor(options: IXsProperty) {
    super('property', options.propertyName, options.sourceClass);
    this.setOptions(options);
    this.entityName = this.object.className;

    if (options && !options.type) {

      // TODO find a better way to detect the type
      if (_.isFunction(options.sourceClass)) {
        let reflectMetadataType = Reflect && Reflect.getMetadata ? Reflect.getMetadata('design:dataType', options.sourceClass, this.name) : undefined;
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
    }

    if (_.isNumber(options.cardinality)) {
      this.cardinality = options.cardinality;
    }

    if (_.isFunction(options.targetClass)) {
      this.targetRef = XsClassRef.get(options.targetClass);
    }

    if (_.isFunction(options.propertyClass)) {
      this.propertyRef = XsClassRef.get(options.propertyClass);
    }

    if (_.isBoolean(options.embedded) && options.embedded) {
      throw new NotYetImplementedError();
    }

    if ((_.isBoolean(options.id) && options.id) || (_.isBoolean(options.pk) && options.pk)) {
      this.identifier = true;
      if ((_.isBoolean(options.auto))) {
        this.generated = options.auto;
      }else{
        this.generated = this.identifier;
      }
    } else {
      this.identifier = false;
      this.generated = false;
    }

    //console.log(this.name, this.dataType);
  }


  isReference(): boolean {
    return this.targetRef != null;
  }


  isInternal(): boolean {
    return this.propertyRef == null;
  }


  isEntityReference(): boolean {
    if (this.isReference()) {
      let entityDef = this.targetRef.getEntity();
      return entityDef !== null;
    }
    return false;
  }


  getSubPropertyDef(): XsPropertyDef[] {
    return XsLookupRegistry.$().filter(XS_TYPE_PROPERTY, {entityName: this.propertyRef.className});
  }


  get label() {
    let label = null;
    let options = this.getOptions();
    if (options.label) {
      label = options.label;
    }

    if (!label) {
      label = _.startCase(this.name);
    } else {
      label = 'None';
    }
    return label;
  }


}
