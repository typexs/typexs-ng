import {XsEntityManager} from '../XsEntityManager';
import {XsClassRef} from '../XsClassRef';
import {XsEntityDef} from '../XsEntityDef';
import * as _ from 'lodash';
import {ConnectionWrapper} from 'typexs-base';
import {SchemaUtils} from '../SchemaUtils';
import {XsRefProperty} from '../entity/XsRefProperty';
import {XsPropertyDef} from '../XsPropertyDef';
import {EntityDefTreeWorker} from './EntityDefTreeWorker';
import {NotYetImplementedError} from '../NotYetImplementedError';
import {XS_REL_TARGET_PREFIX} from '../Constants';
import {NotSupportedError} from '../NotSupportedError';

export class FindOp<T> extends EntityDefTreeWorker {

  readonly em: XsEntityManager;

  private c: ConnectionWrapper;

  constructor(em: XsEntityManager) {
    super();
    this.em = em;
  }


  async onEntityReference(entityDef: XsEntityDef, propertyDef: XsPropertyDef, objects: any[]) {
    let propEntityDef = propertyDef.targetRef.getEntity();

    let conditions: any[] = [];

    // parent and child must be saved till relations can be inserted
    //let objectIds: number[] = SchemaUtils.get('id', objects);
    let [, sourceTypeName] = this.em.nameResolver().forSource('type');
    let [, sourceSeqNrName] = this.em.nameResolver().forSource('seqNr');

    for (let object of objects) {
      let condition: any = {};

      condition[sourceTypeName] = entityDef.name;
      // TODO revision ID
      entityDef.getPropertyDefIdentifier().forEach(x => {
        let [, sourceName] = this.em.nameResolver().forSource(x);
        condition[sourceName] = x.get(object);
      });
      conditions.push(condition);
    }

    let repo = this.c.manager.getRepository(propertyDef.joinRef.getClass());

    // TODO if revision support beachte dies an der stellle
    let results = await repo.createQueryBuilder()
      .where(conditions).orderBy(sourceSeqNrName, 'ASC').getMany();

    conditions = [];

    for (let result of results) {
      // TODO revision support!
      let condition: any = {};
      entityDef.getPropertyDefIdentifier().forEach(x => {
        let [, targetName] = this.em.nameResolver().forTarget(x);
        condition[targetName] = x.get(result);
      });
      conditions.push(condition);
    }

    let targets = await this.c.manager.getRepository(propEntityDef.object.getClass()).createQueryBuilder()
      .where(conditions).getMany();

    targets = await this.loadEntityDef(propEntityDef, targets);

    for (let object of objects) {
      let condition: any = {};
      entityDef.getPropertyDefIdentifier().forEach(x => {
        let [, sourceName] = this.em.nameResolver().forSource(x);
        condition[sourceName] = x.get(object);
      });
      let _results = _.remove(results, condition);

      let pIds = propEntityDef.getPropertyDefIdentifier().map(x => x.name);

      let objectTargets: any[] = [];
      _results.forEach(r => {
        let _cond: any = {};
        pIds.forEach(id => {
          let [targetId,] = this.em.nameResolver().for(XS_REL_TARGET_PREFIX, id);
          _cond[id] = r[targetId];
        });
        let entry = _.filter(targets, _cond);
        objectTargets.push(entry.shift());
      });

      if (propertyDef.cardinality > 1) {
        object[propertyDef.name] = objectTargets;
      } else {
        object[propertyDef.name] = objectTargets.length == 1 ? objectTargets.shift() : null;
      }

    }
  }


  async onPropertyReference(entityDef: XsEntityDef, propertyDef: XsPropertyDef, objects: any[]) {
    let propClass = propertyDef.targetRef.getClass();

    let conditions: any[] = [];

    // parent and child must be saved till relations can be inserted
    //let objectIds: number[] = SchemaUtils.get('id', objects);
    let [sourceTypeId, sourceTypeName] = this.em.nameResolver().forSource('type');
    let [sourceSeqNrId, sourceSeqNrName] = this.em.nameResolver().forSource('seqNr');


    let idProperties = entityDef.getPropertyDefIdentifier();

    let repo = this.c.manager.getRepository(propClass);
    let queryBuilder = repo.createQueryBuilder();

    for (let object of objects) {
      let condition: any = {};
      condition[sourceTypeName] = entityDef.name;
      idProperties.forEach(x => {
        let [, sourceName] = this.em.nameResolver().forSource(x);
        condition[sourceName] = x.get(object);
      });
      queryBuilder.orWhere(Object.keys(condition).map(k => `${k} = '${condition[k]}'`).join(' AND '));
    }

    // TODO if revision support beachte dies an der stellle
    let results = await queryBuilder.orderBy(sourceSeqNrName, 'ASC').getMany();

    conditions = [];

    let subPropertyDefs = this.em.schemaDef.getPropertiesFor(propClass);
    for (let subPropertyDef of subPropertyDefs) {
      if (subPropertyDef.isInternal()) {
        if (subPropertyDef.isReference()) {
          if (subPropertyDef.isEntityReference()) {
            let targetEntity = subPropertyDef.targetRef.getEntity();
            let subIdProperties = targetEntity.getPropertyDefIdentifier();
            let repo = this.c.manager.getRepository(targetEntity.object.getClass());
            let queryBuilder = repo.createQueryBuilder();

            results.map(result => {
              let condition: any = {};
              subIdProperties.forEach(idProp => {
                let [targetId, targetName] = this.em.nameResolver().for(subPropertyDef.machineName(), idProp);
                condition[idProp.name] = result[targetId];
              });
              queryBuilder.orWhere(Object.keys(condition).map(k => `${k} = '${condition[k]}'`).join(' AND '));
            });


            let targets = await queryBuilder.getMany();
            targets = await this.loadEntityDef(targetEntity, targets);

            results.map(result => {
              let condition: any = {};
              subIdProperties.forEach(idProp => {
                let [targetId, targetName] = this.em.nameResolver().for(subPropertyDef.machineName(), idProp);
                condition[idProp.name] = result[targetId];
              });
              let subResults = _.filter(targets, condition);


              // cleanup
              delete result[sourceTypeId];
              delete result[sourceSeqNrId];

              subIdProperties.forEach(idProp => {
                let [targetId, ] = this.em.nameResolver().for(subPropertyDef.machineName(), idProp);
                delete result[targetId];
              });


              if (propertyDef.cardinality > 1) {
                result[subPropertyDef.name] = subResults;
              } else {
                result[subPropertyDef.name] = subResults.length == 1 ? subResults.shift() : null;
              }
            });

          } else {
            throw new NotSupportedError('other then direct entity integration not allowed in property referencing ... ' + subPropertyDef.name);
          }
        }
      } else {
        throw new NotSupportedError('only internal properties allowed ' + subPropertyDef.name);
      }
    }

    objects.map(object => {
      let condition: any = {};
      idProperties.forEach(idProp => {
        let [targetId, targetName] = this.em.nameResolver().forSource(idProp);
        condition[targetId] = object[idProp.name];
      });
      let subResults = _.filter(results, condition);

      // cleanup
      subResults.map(sub => {
        idProperties.map( idProp => {
          let [sourceId,] = this.em.nameResolver().forSource(idProp);
          delete sub[sourceId];
        })
      });

      if (propertyDef.cardinality > 1) {
        object[propertyDef.name] = subResults;
      } else {
        object[propertyDef.name] = subResults.length == 1 ? subResults.shift() : null;
      }
    });

  }


  async onPropertyOfReference(entityDef: XsEntityDef, propertyDef: XsPropertyDef, objects: any[]) {
    let propertyClass = propertyDef.propertyRef.getClass();

    // TODO retrieve aso complex primary keys
    // parent and child must be saved till relations can be inserted
    let objectIds: number[] = SchemaUtils.get('id', objects);

    // TODO if revision support beachte dies an der stellle
    let results = await this.c.manager.getRepository(propertyClass).find({
      where: {
        source_id: objectIds,
        source_type: entityDef.name,
        source_property: propertyDef.name
      },
      order: {
        source_id: 'ASC',
        source_rev_id: 'ASC',
        source_seqnr: 'ASC'
      }
    });

    for (let object of objects) {

      let _results = _.remove(results, {source_id: (object as any).id}).map(x => {
        delete x['source_id'];
        delete x['source_type'];
        delete x['source_seqnr'];
        delete x['source_rev_id'];
        delete x['source_property'];
        return x;
      });

      if (propertyDef.cardinality == 0) {
        object[propertyDef.name] = _results;
      } else if (propertyDef.cardinality > 1) {
        if (_results.length <= propertyDef.cardinality) {
          object[propertyDef.name] = _results;
        } else {
          // TODO change error message
          throw new Error('cardinality limit reached ... ' + propertyDef.name + ' ' + propertyDef.cardinality);
        }
      } else {
        object[propertyDef.name] = _results.length == 1 ? _results.shift() : null;
      }
    }
  }

  private async loadEntityDef<T>(entityName: string | XsEntityDef, objects: T[]): Promise<T[]> {
    if (objects.length > 0) {
      let entityDef: XsEntityDef = <XsEntityDef>entityName;
      if (_.isString(entityName)) {
        entityDef = this.em.schemaDef.getEntity(entityName);
      }
      await this.walk(entityDef, objects);
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


