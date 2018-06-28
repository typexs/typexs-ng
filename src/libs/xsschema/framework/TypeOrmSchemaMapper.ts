import * as _ from 'lodash';
import {IStorageOptions, StorageRef} from 'typexs-base';
import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {XsSchemaDef} from '../XsSchemaDef';
import {NotYetImplementedError} from '../NotYetImplementedError';
import {XsEntityDef} from '../XsEntityDef';
import {XsRefProperty} from '../entity/XsRefProperty';
import {XsPropertyDef} from '../XsPropertyDef';
import {XS_LINK_VARIANT, XS_P_PROPERTY, XS_P_SEQ_NR, XS_P_TYPE, XS_RELATION_TYPE_GLOBAL, XS_TYPE_PROPERTY} from '../Constants';
import {property} from 'rollup/dist/typings/finalisers/shared/sanitize';
import {XsClassRef} from '../XsClassRef';
import {TypeOrmNameResolver} from './TypeOrmNameResolver';
import {XsLookupRegistry} from '../XsLookupRegistry';
import {NotSupportedError} from '../NotSupportedError';

interface DBType {
  type: string;
  length?: number;
}

export class TypeOrmSchemaMapper {

  private storageRef: StorageRef;

  private schemaDef: XsSchemaDef;

  nameResolver: TypeOrmNameResolver = new TypeOrmNameResolver();

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
    return this.storageRef.reload();
  }


  private checkOrCreateEntity(entityDef: XsEntityDef) {
    // TODO check if entities are registered or not
    // register as entity
    // TODO can use other table name! Define an override attribute
    let tName = entityDef.storingName();
    let entityClass = entityDef.object.getClass();
    Entity(tName)(entityClass);

    // TODO add p_relations
    this.storageRef.addEntityType(entityClass);

    // TODO identifier, complex primary keys
    let props = entityDef.getPropertyDefs();
    for (let prop of props) {
      this.onProperty(prop, entityClass, entityDef);
    }
  }


  private onProperty(propertyDef: XsPropertyDef, entityClass: Function, entityDef: XsEntityDef) {
    if (propertyDef.isInternal()) {
      // todo set multiple primary keys
      if (propertyDef.isReference()) {
        let typeorm = propertyDef.getOptions('typeorm');
        if (propertyDef.isEntityReference()) {
          this.onPropertyReferencingEntity(entityDef, propertyDef);
        } else {
          this.onPropertyReferencingProperty(entityDef, propertyDef);
        }
      } else {
        this.onLocalProperty(propertyDef, entityClass);
      }
    } else {
      this.onPropertyOfReference(propertyDef, entityDef);
    }
  }


  private static clazz(str: string) {
    function X() {
    }

    Object.defineProperty(X, 'name', {value: str});
    return X;
  }

  private onPropertyReferencingEntity(entityDef: XsEntityDef, propertyDef: XsPropertyDef) {

    /**
     * different variants to use the relation between 2 entities
     * - use a global p_relations table which can connect multiple elements with each other
     * - use a entity related relations p_{entity_from}_{entity_to}
     * - use a property related relations p_{property_name}_{entity_to}
     * - use a custom configuation with name of join table and mapping keys
     * - if notthing is defined the global variant is prefered
     */
    let refTargetEntity = propertyDef.targetRef.getEntity();
    /**
     * Default variant if nothing else given generate or use p_{propertyName}_{entityName}
     */
    let pName = propertyDef.storingName();
    let clazz = TypeOrmSchemaMapper.clazz(pName);
    propertyDef.joinRef = XsClassRef.get(clazz);
    Entity(pName)(propertyDef.joinRef.getClass());
    this.attachPrimaryKeys(entityDef, propertyDef, propertyDef.joinRef.getClass());
    this.attachTargetKeys(propertyDef, refTargetEntity, propertyDef.joinRef.getClass());
    this.storageRef.addEntityType(propertyDef.joinRef.getClass());

  }

  private onPropertyReferencingProperty(entityDef: XsEntityDef, propertyDef: XsPropertyDef) {
    /**
     * referencing an property containing class, but not entity
     */
      // create new table for property data
    let refTargetClass = propertyDef.targetRef.getClass();
    let pName = propertyDef.storingName();

    let clazz = TypeOrmSchemaMapper.clazz(_.capitalize(propertyDef.name) + entityDef.name);
    propertyDef.joinRef = XsClassRef.get(clazz);

    // members from target class
    this._attachSubProperty(entityDef, propertyDef, pName, clazz, refTargetClass);
  }


  /**
   * PropertyOf integration
   *
   * @param {XsPropertyDef} propertyDef
   */
  private onPropertyOfReference(propertyDef: XsPropertyDef, entityDef: XsEntityDef) {
    // TODO generated id field
    // TODO resolve names and resolve types
    // TODO  it is an extending Property, adding new fields to entity class; or a property which holding data in a seperate table/collection
    let propClass = propertyDef.propertyRef.getClass();
    let clazz = TypeOrmSchemaMapper.clazz(_.capitalize(propertyDef.name) + entityDef.name);
    propertyDef.joinRef = XsClassRef.get(clazz);

    let propEntityName = propertyDef.storingName();
    this._attachSubProperty(entityDef, propertyDef, propEntityName, clazz, propClass);

  }

  private onLocalProperty(prop: XsPropertyDef, entityClass: Function, entityDef: XsEntityDef = null) {
    let propClass = {constructor: entityClass};

    if (prop.identifier) {
      let orm = prop.getOptions('typeorm', {});
      orm = _.merge(orm, this.detectDataTypeFromProperty(prop));
      orm.name = prop.storingName();
      if (prop.generated) {
        // TODO resolve strategy for generation
        PrimaryGeneratedColumn(orm)(propClass, prop.name);
      } else {
        PrimaryColumn(orm)(propClass, prop.name);
      }
    } else {
      this.ColumnDef(prop,prop.storingName())(propClass, prop.name);
    }

  }


  private _attachSubProperty(entityDef: XsEntityDef, propertyDef: XsPropertyDef, storingName: string, storeClass: Function, propClass: Function) {
    Entity(storingName)(storeClass);
    this.attachPrimaryKeys(entityDef, propertyDef, storeClass);

    let properties = this.schemaDef.getPropertiesFor(propClass);
    for (let property of properties) {
      if (property.isInternal()) {
        if (property.isReference()) {
          if (property.isEntityReference()) {
            if (!property.isCollection()) {
              this.attachTargetPrefixedKeys(property.machineName(), property.targetRef.getEntity(), storeClass);
            } else {
              throw new NotSupportedError('not supported; entity reference ');
            }
          } else {
            throw new NotSupportedError('not supported; embedding reference ');
          }
        } else {
          this.onLocalProperty(property, storeClass);
        }

      } else {
        throw new Error('not supported; shouldn\'t happen');
      }
    }
    this.storageRef.addEntityType(storeClass);

  }

  private ColumnDef(property: XsPropertyDef, name: string) {
    let def = _.clone(property.getOptions('typeorm', {}));
    let dbType = this.detectDataTypeFromProperty(property);
    def = _.merge(def, {name: name}, dbType);
    if(property.isNullable()){
      def.nullable = true;
    }
    return Column(def);
  }

  private attachTargetPrefixedKeys(prefix: string, entityDef: XsEntityDef, refTargetClass: Function) {
    let refTargetClassDescr = {constructor: refTargetClass};

    entityDef.getPropertyDefIdentifier().forEach(property => {
      let [targetId, targetName] = this.nameResolver.for(prefix, property);
      this.ColumnDef(property, targetName)(refTargetClassDescr, targetId);
    });

    if (entityDef.areRevisionsEnabled()) {
      let [targetId, targetName] = this.nameResolver.for(prefix, 'revId');
      Column({name: targetName, type: 'int'})(refTargetClassDescr, targetId);
    }

    // TODO if revision support is enabled for entity then it must be handled also be the property
  }


  private attachTargetKeys(propDef: XsPropertyDef, entityDef: XsEntityDef, refTargetClass: Function) {

    let refTargetClassDescr = {constructor: refTargetClass};
    // let propPrefix = propDef.machineName();

    entityDef.getPropertyDefIdentifier().forEach(property => {
      let [targetId, targetName] = this.nameResolver.forTarget(property);
      this.ColumnDef(property, targetName)(refTargetClassDescr, targetId);
    });

    if (entityDef.areRevisionsEnabled()) {
      let [targetId, targetName] = this.nameResolver.forTarget('revId');
      Column({name: targetName, type: 'int'})(refTargetClassDescr, targetId);
    }

    // TODO if revision support is enabled for entity then it must be handled also be the property
  }


  private attachPrimaryKeys(entityDef: XsEntityDef, propDef: XsPropertyDef, refTargetClass: Function) {
    let refTargetClassDescr = {constructor: refTargetClass};
    let [sourceId, sourceName] = this.nameResolver.forSource(XS_P_TYPE);
    PrimaryColumn({name: sourceName, type: 'varchar', length: 64})(refTargetClassDescr, sourceId);

    if (propDef.propertyRef && propDef.propertyRef.getClass() == refTargetClass) {
      [sourceId, sourceName] = this.nameResolver.forSource(XS_P_PROPERTY);
      PrimaryColumn({name: sourceName, type: 'varchar', length: 64})(refTargetClassDescr, sourceId);
    }

    // TODO if revision support is enabled for entity then it must be handled also be the property
    entityDef.getPropertyDefIdentifier().forEach(property => {
      let [sourceId, sourceName] = this.nameResolver.forSource(property);
      let dbType = this.detectDataTypeFromProperty(property);
      let def = _.merge({name: sourceName}, dbType);
      PrimaryColumn(def)(refTargetClassDescr, sourceId);
    });

    if (entityDef.areRevisionsEnabled()) {
      [sourceId, sourceName] = this.nameResolver.forSource(XS_P_PROPERTY);
      PrimaryColumn({name: sourceName, type: 'int'})(refTargetClassDescr, sourceId);
    }
    [sourceId, sourceName] = this.nameResolver.forSource(XS_P_SEQ_NR);
    PrimaryColumn({name: sourceName, type: 'int'})(refTargetClassDescr, sourceId);
  }


  // fixme workaround
  private getStorageOptions(): IStorageOptions {
    return this.storageRef['options'];
  }

  private detectDataTypeFromProperty(prop: XsPropertyDef): DBType {
    // TODO type map for default table types
    let type = {type: 'text'};
    switch (prop.dataType) {
      case 'string':
        type.type = 'text';
        break;
      case 'number':
        type.type = 'int';
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
