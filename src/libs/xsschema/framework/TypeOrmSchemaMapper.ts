import * as _ from 'lodash';
import {ConnectionWrapper, IStorageOptions, StorageRef} from 'typexs-base';
import {getMetadataArgsStorage, Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {XsSchemaDef} from '../XsSchemaDef';
import {NotYetImplementedError} from '../NotYetImplementedError';
import {XsEntityDef} from '../XsEntityDef';
import {XsRefProperty} from '../entity/XsRefProperty';

export class TypeOrmSchemaMapper {

  private storageRef: StorageRef;

  private schemaDef: XsSchemaDef;

  private globalRelationsEnabled: boolean = false;

  constructor(storageRef: StorageRef, schemaDef: XsSchemaDef) {
    this.storageRef = storageRef;
    this.schemaDef = schemaDef;
  }


  async initialize() {

    for (let entity of this.schemaDef.getEntities()) {
      this.checkOrCreateEntity(entity);
    }

    if (this.globalRelationsEnabled) {
      this.storageRef.addEntityType(XsRefProperty);
    }

    //console.log(this.getStorageOptions(), getMetadataArgsStorage());

    return this.storageRef.reload();
  }


  private checkOrCreateEntity(entityDef: XsEntityDef) {
    // TOD check if entities are registered or not
    // register as entity
    let entityName = entityDef.machineName();
    let entityClass = entityDef.object.getClass();
    let propClass = {constructor: entityClass};

    // TODO can use other table name! Define an override attribute
    let tName = 'e_' + entityName;
    Entity(tName)(entityClass);


    // TODO add p_relations
    this.storageRef.addEntityType(entityClass);

    // TODO


    // TODO identifier, complex primary keys
    let props = entityDef.getPropertyDefs();
    for (let prop of props) {
      // TODO for internal properties
      let propName = prop.machineName();

      if (prop.isInternal()) {
        // todo set multiple primary keys
        if (prop.isReference()) {

          if (prop.isEntityReference()) {

            // prop.getOptions('')

            //let refEntityName = prop.targetRef.getEntity().machineName();
            //let pName = 'p_' + prop.machineName() + '_' + refEntityName;

            // use p_relations table o
            /**
             * different variants to use the relation between 2 entities
             * - use a global p_relations table which can connect multiple elements with each other
             * - use a entity related relations p_{entity_from}_{entity_to}
             * - use a property related relations p_{property_name}_{entity_to}
             * - use a custom configuation with name of join table and mapping keys
             * - if notthing is defined the global variant is prefered
             */

            this.globalRelationsEnabled = true;

            prop.setOption('linkVariant','global');
          } else {

            // create new table for property data
            let refTargetClass = prop.targetRef.getClass();
            let refTargetClassDescr = {constructor: refTargetClass};
            let refTargetName = prop.targetRef.machineName();
            let pName = 'p_' + propName + '_' + refTargetName;

            // members from target class
            Entity(pName)(refTargetClass);
            PrimaryGeneratedColumn()(refTargetClassDescr, 'id');
            Column('varchar', {length: 64})(refTargetClassDescr, 'source_type');
            Column('int')(refTargetClassDescr, 'source_id');
            Column('int')(refTargetClassDescr, 'source_seqnr');

            this.storageRef.addEntityType(refTargetClass);
          }

          // TODO handle this?
          if (prop.cardinality > 1) {

          } else {

          }


        } else {

          if (prop.getOptions('id')) {
            PrimaryGeneratedColumn()(propClass, prop.name);
          } else {

            // TODO type map for default table types
            let type = 'text';
            switch (prop.dataType) {
              case 'string':
                type = 'text';
                break;
              case 'number':
                type = 'int';
                break;
            }

            Column(type)(propClass, prop.name);
          }
        }
      } else {
        /*
        let pName = 'p_' + _.kebabCase(prop.name);
        let klass = prop.targetRef.getClass();
        Entity(pName)(klass);
    this.storageRef.addEntityType(klass);
        PrimaryGeneratedColumn()(klass);
        Column('text')(klass,'entity_type')
*/
        throw new NotYetImplementedError();
      }

    }
  }

  // fixme workaround
  private getStorageOptions(): IStorageOptions {
    return this.storageRef['options'];
  }

  isClassDefinedInStorage(fn: Function) {
    for (let definedEntity of this.getStorageOptions().entities) {
      if (_.isString(definedEntity) && fn.name == definedEntity) return true;
      if (_.isFunction(definedEntity) && fn == definedEntity) return true;

    }
    return false;
  }
}
