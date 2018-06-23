import {XsEntityManager} from '../XsEntityManager';
import {XsClassRef} from '../XsClassRef';
import {XsEntityDef} from '../XsEntityDef';
import * as _ from 'lodash';
import {ConnectionWrapper} from 'typexs-base';
import {SchemaUtils} from '../SchemaUtils';
import {XsRefProperty} from '../entity/XsRefProperty';
import {XsPropertyDef} from '../XsPropertyDef';
import {EntityDefTreeWorker} from './EntityDefTreeWorker';

export class FindOp<T> extends EntityDefTreeWorker {

  readonly em: XsEntityManager;

  private c: ConnectionWrapper;

  constructor(em: XsEntityManager) {
    super();
    this.em = em;
  }


  async onEntityReferenceAsGlobalVariant(entityDef: XsEntityDef, propertyDef: XsPropertyDef, objects: any[]) {
    let propEntityDef = propertyDef.targetRef.getEntity();

    // parent and child must be saved till relations can be inserted
    let objectIds: number[] = SchemaUtils.get('id', objects);

    // TODO if revision support beachte dies an der stellle
    let results = await this.c.manager.getRepository(XsRefProperty).find({
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
      objectIds = SchemaUtils.get('target_id', _results);

      // TODO create setter in property
      let objectTargets = _.remove(targets, target => objectIds.indexOf((target as any).id) > -1);
      if (propertyDef.cardinality > 1) {
        object[propertyDef.name] = objectTargets;
      } else {
        object[propertyDef.name] = objectTargets.length == 1 ? objectTargets.shift() : null;
      }
    }
  }


  private async loadEntityDef<T>(entityName: string | XsEntityDef, objects: T[]): Promise<T[]> {
    let entityDef: XsEntityDef = <XsEntityDef>entityName;
    if (_.isString(entityName)) {
      entityDef = this.em.schemaDef.getEntity(entityName);
    }
    await this.walk(entityDef, objects);
    return objects;
  }


  async run(entityType: Function | string, findConditions: any): Promise<T[]> {
    let xsEntityDef = XsClassRef.get(entityType).getEntity();
    this.c = await this.em.storageRef.connect();
    let results = <any[]>await this.c.manager.find(xsEntityDef.object.getClass(), {where: findConditions});
    return this.loadEntityDef(xsEntityDef, results);
  }

}


