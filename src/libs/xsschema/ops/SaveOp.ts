import {XsEntityDef} from '../XsEntityDef';
import * as _ from 'lodash';
import {ConnectionWrapper} from 'typexs-base';
import {SchemaUtils} from '../SchemaUtils';
import {XsRefProperty} from '../entity/XsRefProperty';
import {XsPropertyDef} from '../XsPropertyDef';
import {XsEntityManager} from '../XsEntityManager';
import {EntityDefTreeWorker} from './EntityDefTreeWorker';
import {NotYetImplementedError} from '../NotYetImplementedError';


export class PropertyRelationData {

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

  private globalRelations: any[] = [];

  private relations: { className: string, relations: any[] }[] = [];

  constructor(em: XsEntityManager) {
    super();
    this.em = em;
  }


  async onEntityReferenceAsGlobalVariant(entityDef: XsEntityDef, propertyDef: XsPropertyDef, objects: any[]) {
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
    flattenObjects = await this.saveByEntityDef(propertyDef.targetRef.getEntity(), flattenObjects);
    // TODO write back
    for (let i = 0; i < flattenObjects.length; i++) {
      let mapping = map[i];
      let sourceIdx = mapping[0];
      if (mapping[1]) {
        let posIdx = mapping[1];
        _.set(<any>objects[sourceIdx], propertyDef.name + '[' + posIdx + ']', flattenObjects[i]);
        // caching relation
        this.globalRelations.push({source: objects[sourceIdx], target: flattenObjects[i], seqnr: posIdx, prop: propertyDef});
      } else {
        _.set(<any>objects[sourceIdx], propertyDef.name, flattenObjects[i]);
        this.globalRelations.push({source: objects[sourceIdx], target: flattenObjects[i], seqnr: -1, prop: propertyDef});
      }
    }
  }


  onPropertyOfReference(entityDef: XsEntityDef, propertyDef: XsPropertyDef, objects: any[]): void {
    // if(property.embedded){}
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
  }


  private async processRelations(): Promise<any[]> {
    let classNames = Object.keys(this.relations);
    let promises: Promise<any>[] = [];

    for (let className of classNames) {
      let relations = this.relations[className];
      let rels: any[] = [];
      while (relations.length > 0) {
        let relation = relations.shift();
        if (relation instanceof PropertyRelationData) {
          let target = _.clone(relation.target);
          target.source_type = relation.sourceRef.name;
          target.source_property = relation.propertyRef.name;
          target.source_id = relation.source.id;
          target.source_rev_id = 0;
          target.source_seqnr = relation.seqnr;
          rels.push(target);
        }else{
          throw new NotYetImplementedError();
        }
      }
      promises.push(this.c.manager.save(className, rels));

    }

    return Promise.all(promises);
  }


  private processGlobalRelations(): Promise<any[]> {
    let globalRefs = [];
    for (let relation of this.globalRelations) {
      if (relation.prop.getOptions('linkVariant') == 'global') {
        let rel = new XsRefProperty();
        globalRefs.push(rel);
        rel.source_property = relation.prop.name;
        rel.source_type = relation.prop.entityName;
        rel.source_id = relation.source['id'];
        rel.source_seqnr = relation.seqnr;
        rel.target_id = relation.target['id'];
        rel.target_type = relation.prop.targetRef.className;
      }
    }
    return this.c.manager.save(XsRefProperty, globalRefs);
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
    this.globalRelations = [];
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
        .then(x => {
          return this.processGlobalRelations();
        }).then(x => {
          return this.processRelations();
        });
    });


    if (!isArray) {
      return this.objects.shift();
    }
    return this.objects;

  }

}
