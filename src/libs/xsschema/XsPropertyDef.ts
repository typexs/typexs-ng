import * as _ from 'lodash';
import {XsDef} from './XsDef';
import {IXsProperty} from './IXsProperty';
import {XsClassRef} from './XsClassRef';
import {XsLookupRegistry} from './XsLookupRegistry';
import {XsEntityDef} from './XsEntityDef';
import {XS_TYPE_ENTITY} from './Constants';

export class XsPropertyDef extends XsDef {

  idKeys = ['schemaName', 'entityName', 'name'];

  schemaName: string = 'default';

  readonly cardinality: number = 1;

  readonly entityName: string;

  readonly dataType: string;

  readonly targetRef: XsClassRef = null;

  readonly propertyRef: XsClassRef = null;

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
