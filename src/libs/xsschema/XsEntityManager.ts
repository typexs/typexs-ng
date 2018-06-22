import {StorageRef} from 'typexs-base';
import {XsSchemaDef} from './XsSchemaDef';
import {XsEntityDef} from './XsEntityDef';
import {NotYetImplementedError} from './NotYetImplementedError';
import {TypeOrmSchemaMapper} from './framework/TypeOrmSchemaMapper';
import {XsPropertyDef} from './XsPropertyDef';
import {SaveOp} from './ops/SaveOp';
import {FindOp} from './ops/FindOp';


/**
 *
 *
 *
 */
export class XsEntityManager {

  // revision support
  readonly storageRef: StorageRef;

  readonly schemaDef: XsSchemaDef;

  readonly mapper: TypeOrmSchemaMapper;

  constructor(schema: XsSchemaDef = null, storageRef: StorageRef = null) {
    this.storageRef = storageRef;
    this.schemaDef = schema;
    this.mapper = new TypeOrmSchemaMapper(this.storageRef, this.schemaDef);
  }


  async initialize() {
    await this.mapper.initialize();
  }

  async save<T>(object: T): Promise<T>;
  async save<T>(object: T[]): Promise<T[]>;
  async save<T>(object: T | T[]): Promise<T | T[]> {
    return new SaveOp<T>(this).run(object);
  }


  async find<T>(fn: Function, conditions: any): Promise<T[]> {
    return new FindOp<T>(this).run(fn, conditions);
  }


  static resolveByEntityDef<T>(objs: T[]) {
    let resolved: { [entityType: string]: T[] } = {};
    for (let obj of objs) {
      let entityName = XsEntityDef.resolveName(obj);
      if (!resolved[entityName]) {
        resolved[entityName] = [];
      }
      resolved[entityName].push(obj);

    }
    return resolved;
  }

}

export class Bindings {
  variant: string;
  source: any;
  propertyName: string;
  index: number = -1;
  target: any;
}




// TODO prevent circulations
export abstract class EntityDefTreeWorker {


  onEntityReferenceAsGlobalVariant(entityDef: XsEntityDef, property: XsPropertyDef, objects: any[]): void {
    throw new NotYetImplementedError();
  }


  async walk(entityDef: XsEntityDef, objects: any[]) {

    let properties = entityDef.getPropertyDefs();
    for (let propertyDef of properties) {
      if (propertyDef.isInternal()) {
        if (propertyDef.isReference()) {
          if (propertyDef.isEntityReference()) {

            let variant = propertyDef.getOptions('linkVariant');
            //let propEntityDef = propertyDef.targetRef.getEntity();
            if (variant === 'global') {
              await this.onEntityReferenceAsGlobalVariant(entityDef, propertyDef, objects);
            }
          } else {
            throw new NotYetImplementedError();
          }
        } else {
          throw new NotYetImplementedError();
        }
      } else {
        // throw new NotYetImplementedError();
      }
    }
  }


}


