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
    for (let object of objects) {
      let condition: any = {};
      condition['source_type'] = entityDef.name;
      condition['source_seqnr'] = entityDef.name;
      entityDef.getPropertyDefIdentifier().forEach(x => {
        condition['source_' + x.machineName()] = x.get(object);
      });
      conditions.push(condition);
    }

    let repo = this.c.manager.getRepository(propertyDef.joinRef.getClass());

    // TODO if revision support beachte dies an der stellle
    let results = await repo.createQueryBuilder()
      .where(conditions).orderBy('source_seqnr', 'ASC').getMany();

    conditions = [];

    for (let result of results) {
      // TODO revision support!
      let condition: any = {};
      entityDef.getPropertyDefIdentifier().forEach(x => {
        condition['target_' + x.machineName()] = x.get(result);
      });
      conditions.push(condition);
    }

    let targets = await this.c.manager.getRepository(propEntityDef.object.getClass()).createQueryBuilder()
      .where(conditions).getMany();

    targets = await this.loadEntityDef(propEntityDef, targets);

    for (let object of objects) {
      let condition: any = {};
      entityDef.getPropertyDefIdentifier().forEach(x => {
        condition['source' + _.capitalize(x.name)] = x.get(object);
      });
      let _results = _.remove(results, condition);

      let pIds = propEntityDef.getPropertyDefIdentifier().map(x => x.name);

      let objectTargets: any[] = [];
      _results.forEach(r => {
        let _cond: any = {};
        pIds.forEach(id => {
          _cond[id] = r['target' + _.capitalize(id)];
        });
        let entry = _.remove(targets, _cond);
        objectTargets.push(entry.shift());
      });

      if (propertyDef.cardinality > 1) {
        object[propertyDef.name] = objectTargets;
      } else {
        object[propertyDef.name] = objectTargets.length == 1 ? objectTargets.shift() : null;
      }

    }
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


