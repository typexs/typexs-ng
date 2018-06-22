import * as _ from 'lodash';
import {ConnectionWrapper, EntitySchemaType, StorageRef} from 'typexs-base';
import {XsSchemaDef} from './XsSchemaDef';
import {getMetadataArgsStorage, Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {XsEntityDef} from './XsEntityDef';
import {NotYetImplementedError} from './NotYetImplementedError';
import {XsRefProperty} from './entity/XsRefProperty';
import {TypeOrmSchemaMapper} from './framework/TypeOrmSchemaMapper';
import {XsClassRef} from './XsClassRef';


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


  /*
  static save<T>(instance:T):T {

    return instance;
  }
  */

}

export class Bindings {
  variant: string;
  source: any;
  propertyName: string;
  index: number = -1;
  target: any;
}


export abstract class AbstractOp {


}


export class FindOp<T> {

  condition: any;


  readonly em: XsEntityManager;

  private objects: T[] = [];

  private c: ConnectionWrapper;

  constructor(em: XsEntityManager) {
    this.em = em;
  }

  private async loadEntityDef<T>(entityName: string | XsEntityDef, objects: T[]): Promise<T[]> {
    let entityDef: XsEntityDef = <XsEntityDef>entityName;
    if (_.isString(entityName))
      entityDef = this.em.schemaDef.getEntity(entityName);


    let properties = entityDef.getPropertyDefs();
    for (let propertyDef of properties) {
      if (propertyDef.isInternal()) {
        if (propertyDef.isReference()) {
          if (propertyDef.isEntityReference()) {
            let variant = propertyDef.getOptions('linkVariant');
            let propEntityDef = propertyDef.targetRef.getEntity();
            if (variant === 'global') {


              // parent and child must be saved till relations can be inserted
              let objectIds: number[] = SaveOp.get('id', objects);

              // TODO if revision support beachte dies an der stellle
              let results = await this.c.manager.getRepository(XsRefProperty).find({
                where: {
                  source_id: objectIds,
                  source_entity_type: entityDef.name,
                  source_property: propertyDef.name
                }, order: {source_id: 'ASC', source_rev_id: 'ASC', source_seqnr: 'ASC'}
              });

              let targetIds: number[] = [];

              for (let result of results) {
                // TODO revision support!
                targetIds.push(result.target_id);

              }

              let targets = await this.c.manager.getRepository(propEntityDef.object.getClass()).find({
                where: {
                  id: targetIds,
                }
              });

              targets = await this.loadEntityDef(propEntityDef, targets);


              for (let object of objects) {
                let _results = _.remove(results, {source_id: (object as any).id});

                // TODO revisions
                objectIds = SaveOp.get('target_id', _results);

                // TODO create setter in property
                let objectTargets = _.remove(targets, target => objectIds.indexOf((target as any).id) > -1);
                if (propertyDef.cardinality > 1) {
                  object[propertyDef.name] = objectTargets;
                } else {
                  object[propertyDef.name] = objectTargets.length == 1 ? objectTargets.shift() : null;
                }
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

    return objects;
  }


  async run(entityType: Function | string, findConditions: any): Promise<T[]> {
    let xsEntityDef = XsClassRef.get(entityType).getEntity();
    this.c = await this.em.storageRef.connect();
    let results = <any[]>await this.c.manager.find(xsEntityDef.object.getClass(), {where: findConditions});
    return this.loadEntityDef(xsEntityDef, results);
  }


}

export class SaveOp<T> {


  readonly em: XsEntityManager;

  private objects: T[] = [];

  private c: ConnectionWrapper;

  constructor(em: XsEntityManager) {
    this.em = em;
  }

  static get<X, Y>(property: string, objects: X[]): Y[] {
    let y: Y[] = [];
    for (let object of objects) {
      let values = _.get(object, property);
      y.push(values);
    }

    return y;
  }


  private async saveByEntityDef<T>(entityName: string, objects: T[]): Promise<T[]> {
    let entityDef = this.em.schemaDef.getEntity(entityName);


//    let bindings

    // entityDef.
    // check if properties with references or complex extra content are present

    let relations = [];
    let properties = entityDef.getPropertyDefs();
    for (let propertyDef of properties) {
      if (propertyDef.isInternal()) {
        if (propertyDef.isReference()) {
          if (propertyDef.isEntityReference()) {
            let variant = propertyDef.getOptions('linkVariant');
            let propEntityDef = propertyDef.targetRef.getEntity();
            if (variant === 'global') {
              // parent and child must be saved till relations can be inserted
              let innerObjects: any[] = SaveOp.get(propertyDef.name, objects);
              let map: number[][] = [];
              let flattenObjects: any[] = [];
              for (let i = 0; i < innerObjects.length; i++) {
                if (_.isArray(innerObjects[i])) {
                  for (let j = 0; j < innerObjects[i].length; j++) {
                    map.push([i, j]);
                    flattenObjects.push(innerObjects[i][j]);
                  }
                } else {
                  map.push([i]);
                  flattenObjects.push(innerObjects[i]);
                }
              }
              flattenObjects = await this.saveByEntityDef(propEntityDef.name, flattenObjects);
              // TODO write back
              for (let i = 0; i < flattenObjects.length; i++) {
                let mapping = map[i];
                let sourceIdx = mapping[0];
                if (mapping[1]) {
                  let posIdx = mapping[1];
                  _.set(<any>objects[sourceIdx], propertyDef.name + '[' + posIdx + ']', flattenObjects[i]);
                  // caching relation
                  relations.push({source: objects[sourceIdx], target: flattenObjects[i], seqnr: posIdx, prop: propertyDef});
                } else {
                  _.set(<any>objects[sourceIdx], propertyDef.name, flattenObjects[i]);
                  relations.push({source: objects[sourceIdx], target: flattenObjects[i], seqnr: -1, prop: propertyDef});
                }
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

    // let repo = this.c.manager.getRepository(entityDef.object.getClass());
    objects = await this.c.manager.save(entityDef.object.getClass(), objects);

    let globalRefs = [];
    for (let relation of relations) {
      if (relation.prop.getOptions('linkVariant') == 'global') {
        let rel = new XsRefProperty();
        globalRefs.push(rel);
        rel.source_property = relation.prop.name;
        rel.source_entity_type = relation.prop.entityName;
        rel.source_seqnr = relation.seqnr;
        rel.source_id = relation.source['id'];
        rel.target_id = relation.target['id'];
        rel.target_entity_type = relation.prop.targetRef.className;
      }
    }
    await this.c.manager.save(XsRefProperty, globalRefs);
    return objects;
  }


  prepare(object: T | T[]): T[] {
    let objs: T[] = [];
    if (_.isArray(object)) {
      objs = object;
    } else {
      objs.push(object);
    }
    return objs;
  }


  async run(object: T | T[]): Promise<T | T[]> {
    let isArray = _.isArray(object);

    this.objects = this.prepare(object);

    let resolveByEntityDef = XsEntityManager.resolveByEntityDef(this.objects);
    let entityNames = Object.keys(resolveByEntityDef);
    this.c = await this.em.storageRef.connect();

    // start transaction, got to leafs and save
    let results = await this.c.manager.transaction(async em => {
      let promises = [];
      for (let entityName of entityNames) {
        let p = this.saveByEntityDef(entityName, resolveByEntityDef[entityName]);
        promises.push(p);
      }
      return Promise.all(promises);
    });

    if (!isArray) {
      return this.objects.shift();
    }
    return this.objects;

  }

}
