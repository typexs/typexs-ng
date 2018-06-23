import * as _ from 'lodash';
import {IStorageOptions, StorageRef} from 'typexs-base';
import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {XsSchemaDef} from '../XsSchemaDef';
import {NotYetImplementedError} from '../NotYetImplementedError';
import {XsEntityDef} from '../XsEntityDef';
import {XsRefProperty} from '../entity/XsRefProperty';
import {XsPropertyDef} from '../XsPropertyDef';

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


    // TODO can use other table name! Define an override attribute
    let tName = 'e_' + entityName;
    Entity(tName)(entityClass);


    // TODO add p_relations
    this.storageRef.addEntityType(entityClass);

    // TODO


    // TODO identifier, complex primary keys
    let props = entityDef.getPropertyDefs();
    for (let prop of props) {
      this.onProperty(prop, entityClass);
    }
  }


  private onProperty(prop: XsPropertyDef, entityClass: Function) {
    let propClass = {constructor: entityClass};
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

          prop.setOption('linkVariant', 'global');
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
        this.onLocalProperty(prop, entityClass);
      }
    } else {
      this.onPropertyOfReference(prop);
    }
  }


  private onLocalProperty(prop: XsPropertyDef, entityClass: Function) {
    let propClass = {constructor: entityClass};
    let type = this.detectDataTypeFromProperty(prop);
    if (prop.identifier) {
      if (prop.generated) {
        // TODO resolve strategy for generation
        PrimaryGeneratedColumn()(propClass, prop.name);
      } else {
        PrimaryColumn(type)(propClass, prop.name);
      }
    } else {
      Column(type)(propClass, prop.name);
    }

  }


  private onPropertyOfReference(prop: XsPropertyDef) {
    // TODO generated id field
    // TODO resolve names and resolve types
    // TODO  it is an extending Property, adding new fields to entity class; or a property which holding data in a seperate table/collection
    let propClass = prop.propertyRef.getClass();
    let propEntityName = 'p_' + prop.machineName();
    Entity(propEntityName)(propClass);

    // TODO what is with inner references

    let propEntityConstrut = {constructor: propClass};
    PrimaryColumn('int')(propEntityConstrut, 'source_id');
    PrimaryColumn('int')(propEntityConstrut, 'source_rev_id');
    PrimaryColumn({type: 'varchar', length: 64})(propEntityConstrut, 'source_type');
    PrimaryColumn('int')(propEntityConstrut, 'source_seqnr');

    for (let subProp of prop.getSubPropertyDef()) {
      // console.log(subProp)
      this.onProperty(subProp, propClass);
    }

    this.storageRef.addEntityType(propClass);
  }

  // fixme workaround
  private getStorageOptions(): IStorageOptions {
    return this.storageRef['options'];
  }

  private detectDataTypeFromProperty(prop: XsPropertyDef): string {
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
    return type;
  }


  isClassDefinedInStorage(fn: Function) {
    for (let definedEntity of this.getStorageOptions().entities) {
      if (_.isString(definedEntity) && fn.name == definedEntity) return true;
      if (_.isFunction(definedEntity) && fn == definedEntity) return true;

    }
    return false;
  }

}
