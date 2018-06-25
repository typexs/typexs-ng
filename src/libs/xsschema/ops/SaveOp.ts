import {XsEntityDef} from '../XsEntityDef';
import * as _ from 'lodash';
import {ConnectionWrapper} from 'typexs-base';
import {SchemaUtils} from '../SchemaUtils';
import {XsRefProperty} from '../entity/XsRefProperty';
import {XsPropertyDef} from '../XsPropertyDef';
import {XsEntityManager} from '../XsEntityManager';
import {EntityDefTreeWorker} from './EntityDefTreeWorker';
import {NotYetImplementedError} from '../NotYetImplementedError';
import {XS_REL_SOURCE_PREFIX} from '../Constants';


export interface IRelation {

}

export class EntityRefenceRelation implements IRelation {

  sourceRef: XsEntityDef;

  propertyRef: XsPropertyDef;

  source: any;

  target: any;

  seqnr: number;


}

export class PropertyRefenceRelation implements IRelation {

  sourceRef: XsEntityDef;

  propertyRef: XsPropertyDef;

  source: any;

  target: any;

  seqnr: number;


}


export class SaveOp<T> extends EntityDefTreeWorker {

  readonly em: XsEntityManager;

  private objects: T[] = [];

  private c: ConnectionWrapper;

  private relations: { [className: string]: IRelation[] } = {};


  constructor(em: XsEntityManager) {
    super();
    this.em = em;
  }

  extractPropertyObjects(propertyDef: XsPropertyDef, objects: any[]): [number[][], any[]] {
    let innerObjects: any[] = SchemaUtils.get(propertyDef.name, objects);
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
    return [map, flattenObjects];
  }

  async onEntityReference(entityDef: XsEntityDef, propertyDef: XsPropertyDef, objects: any[]) {
    let [map, flattenObjects] = this.extractPropertyObjects(propertyDef, objects);
    flattenObjects = await this.saveByEntityDef(propertyDef.targetRef.getEntity(), flattenObjects);
    // TODO write back

    let className = propertyDef.joinRef.className;
    this.createBindingRelation(EntityRefenceRelation, entityDef, propertyDef, className, flattenObjects, map, objects);

  }

  createBindingRelation(klazz: Function, entityDef: XsEntityDef, propertyDef: XsPropertyDef, className: string, flattenObjects: any[], map: number[][], objects: any[]) {
    if (!this.relations[className]) {
      this.relations[className] = [];
    }

    for (let i = 0; i < flattenObjects.length; i++) {
      let mapping = map[i];
      let sourceIdx = mapping[0];
      if (mapping[1]) {
        let posIdx = mapping[1];
        _.set(<any>objects[sourceIdx], propertyDef.name + '[' + posIdx + ']', flattenObjects[i]);
        // caching relation
//        this.globalRelations.push({source: objects[sourceIdx], target: flattenObjects[i], seqnr: posIdx, prop: propertyDef});

        let rel = Reflect.construct(klazz, []);
        rel.sourceRef = entityDef;
        rel.propertyRef = propertyDef;
        rel.source = objects[sourceIdx];
        rel.target = flattenObjects[i];
        rel.seqnr = posIdx;
        this.relations[className].push(rel);

      } else {
        _.set(<any>objects[sourceIdx], propertyDef.name, flattenObjects[i]);
        // this.globalRelations.push({source: objects[sourceIdx], target: flattenObjects[i], seqnr: -1, prop: propertyDef});

        let rel = Reflect.construct(klazz, []);
        rel.sourceRef = entityDef;
        rel.propertyRef = propertyDef;
        rel.source = objects[sourceIdx];
        rel.target = flattenObjects[i];
        rel.seqnr = 0;
        this.relations[className].push(rel);
      }
    }
  }

  createBindingRelation2(propertyDef: XsPropertyDef,
                         flattenObjects: any[], map: number[][], objects: any[]) {

    for (let i = 0; i < flattenObjects.length; i++) {
      let mapping = map[i];
      let sourceIdx = mapping[0];
      if (mapping[1]) {
        let posIdx = mapping[1];
        _.set(<any>objects[sourceIdx], propertyDef.name + '[' + posIdx + ']', flattenObjects[i]);
      } else {
        _.set(<any>objects[sourceIdx], propertyDef.name, flattenObjects[i]);
        // this.globalRelations.push({source: objects[sourceIdx], target: flattenObjects[i], seqnr: -1, prop: propertyDef});
      }
    }
  }


  async onPropertyReference(entityDef: XsEntityDef, propertyDef: XsPropertyDef, objects: any[]): Promise<void> {
    let targetRefClass = propertyDef.targetRef.getClass();
    let [map, propertyObjects] = this.extractPropertyObjects(propertyDef, objects);

    let properties = this.em.schema().getPropertiesFor(targetRefClass);
    for (let property of properties) {

      if (property.isInternal()) {
        if (property.isReference()) {
          if (property.isEntityReference()) {
            if (property.cardinality == 1) {
              let [subMap, subFlattenObjects] = this.extractPropertyObjects(property, propertyObjects);
              subFlattenObjects = await this.saveByEntityDef(property.targetRef.getEntity(), subFlattenObjects);
              this.createBindingRelation2(property, subFlattenObjects, subMap, propertyObjects);
              // this.attachTargetPrefixedKeys(property.machineName(), property.targetRef.getEntity(), targetRefClass);
            } else {
              throw new Error('not supported; entity reference; cardinality > 1 ');
            }
          } else {
            throw new Error('not supported; embedding reference ');
          }
        }

      } else {
        throw new Error('not supported; shouldn\'t happen');
      }
    }
    this.createBindingRelation(PropertyRefenceRelation, entityDef, propertyDef, targetRefClass.name, propertyObjects, map, objects);


  }


  onPropertyOfReference(entityDef: XsEntityDef, propertyDef: XsPropertyDef, objects: any[]): void {
    // if(property.embedded){}
    /*
    let innerObjects: any[] = SchemaUtils.get(propertyDef.name, objects);

    if (!this.relations[propertyDef.propertyRef.className]) {
      this.relations[propertyDef.propertyRef.className] = [];
    }
    let relations = this.relations[propertyDef.propertyRef.className];

    for (let i = 0; i < innerObjects.length; i++) {
      if (_.isArray(innerObjects[i])) {
        for (let j = 0; j < innerObjects[i].length; j++) {
          let rel = new PropertyRelationData();
          rel.sourceRef = entityDef;
          rel.propertyRef = propertyDef;
          rel.source = objects[i];
          rel.target = innerObjects[i][j];
          rel.seqnr = j;
          relations.push(rel);
        }
      } else {
        let rel = new PropertyRelationData();
        rel.sourceRef = entityDef;
        rel.propertyRef = propertyDef;
        rel.source = objects[i];
        rel.target = innerObjects[i];
        rel.seqnr = -1;
        relations.push(rel);
      }
    }
    */
  }


  private async processRelations(): Promise<any[]> {

    let classNames = Object.keys(this.relations);
    let promises: Promise<any>[] = [];

    for (let className of classNames) {
      let relations = this.relations[className];
      let rels: any[] = [];
      while (relations.length > 0) {
        let relation = relations.shift();
        if (relation instanceof EntityRefenceRelation) {

          if (relation.propertyRef.isEntityReference()) {
            let joinObj = Reflect.construct(relation.propertyRef.joinRef.getClass(), []);
            let [id, name] = this.em.nameResolver().forSource('type');
            joinObj[id] = relation.sourceRef.name;

            relation.sourceRef.getPropertyDefIdentifier().forEach(prop => {
              [id, name] = this.em.nameResolver().forSource(prop);
              joinObj[id] = prop.get((<EntityRefenceRelation>relation).source);
            });

            [id, name] = this.em.nameResolver().forSource('seqnr');
            joinObj[id] = relation.seqnr;

            relation.propertyRef.targetRef.getEntity().getPropertyDefIdentifier().forEach(prop => {
              [id, name] = this.em.nameResolver().forTarget(prop);
              joinObj[id] = prop.get((<EntityRefenceRelation>relation).target);
            });


            // TODO if revision ass id
            rels.push(joinObj);
          } else {
            throw new NotYetImplementedError();
          }
        } else if (relation instanceof PropertyRefenceRelation) {
          let targetRefClass = relation.propertyRef.targetRef.getClass();
          let joinObj = Reflect.construct(targetRefClass, []);
          let [id, name] = this.em.nameResolver().forSource('type');
          joinObj[id] = relation.sourceRef.name;

          relation.sourceRef.getPropertyDefIdentifier().forEach(prop => {
            [id, name] = this.em.nameResolver().forSource(prop);
            joinObj[id] = prop.get((<PropertyRefenceRelation>relation).source);
          });

          [id, name] = this.em.nameResolver().forSource('seqnr');
          joinObj[id] = relation.seqnr;

          let properties = this.em.schema().getPropertiesFor(targetRefClass);
          for (let prop of properties) {

            if (prop.isInternal()) {
              if (prop.isReference()) {
                if (prop.isEntityReference()) {
                  prop.targetRef.getEntity().getPropertyDefIdentifier().forEach(_prop => {
                    [id, name] = this.em.nameResolver().for(prop.machineName(), _prop);
                    joinObj[id] = _prop.get((<PropertyRefenceRelation>relation).target[prop.name]);
                  });
                } else {
                  throw new Error('not supported; AAA');
                }
              } else {
                joinObj[prop.name] = prop.get((<PropertyRefenceRelation>relation).target);
              }
            }

          }

          // TODO if revision ass id
          rels.push(joinObj);

        } else {
          throw new NotYetImplementedError();
        }
      }
      promises.push(this.c.manager.save(className, rels));

    }

    return Promise.all(promises);
  }


  private async saveByEntityDef<T>(entityName: string | XsEntityDef, objects: T[]): Promise<T[]> {
    let entityDef = SchemaUtils.resolve(this.em.schemaDef, entityName);
    await this.walk(entityDef, objects);
    objects = await this.c.manager.save(entityDef.object.getClass(), objects);
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
    this.relations = {};
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
      return Promise.all(promises)
      //        .then(x => {
      //  return this.processGlobalRelations();
      //  })
        .then(x => {
          return this.processRelations();
        });
    });


    if (!isArray) {
      return this.objects.shift();
    }
    return this.objects;

  }

}
