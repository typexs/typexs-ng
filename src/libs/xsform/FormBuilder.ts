import {NotYetImplementedError} from 'typexs-base/libs/exceptions/NotYetImplementedError';
import {FormObject} from './FormObject';
import {Form} from './elements';

import {ResolveDataValue} from './ResolveDataValue';
import {EntityDef} from 'typexs-schema/libs/EntityDef';
import {PropertyDef} from 'typexs-schema/libs/PropertyDef';
import {SchemaDef} from 'typexs-schema/libs/SchemaDef';
import {EntityRegistry} from 'typexs-schema/libs/EntityRegistry';
import * as _ from '../../libs/LoDash';
import {NoFormTypeDefinedError} from '../../libs/exceptions/NoFormTypeDefinedError';
import {ContentComponentRegistry} from '../xsview/ContentComponentRegistry';


export class FormBuilder {

  private data: any;

  private form: FormObject;

  private schema: SchemaDef;

  buildFromJSON(data: any): Form {
    this.data = data;
    this.schema = EntityRegistry.getSchema('default');
    return <Form>this._buildForm(data);
  }

  buildFromEntity(entity: EntityDef): Form {
    this.data = entity;
    return <Form>this._buildFormObject(entity);
  }


  private _buildFormObject(entity: EntityDef | PropertyDef, parent: FormObject = null) {

    let formObject: FormObject = null;

    if (!this.form) {
      this.schema = EntityRegistry.getSchema(entity.schemaName);
      this.form = formObject = ContentComponentRegistry.createHandler('form');
      formObject.handle('name', entity.id());
      formObject.handle('binding', entity);
    } else if (entity instanceof PropertyDef) {
      // TODO support also other types
      let property = entity;
      let formType = <string>property.getOptions('form') || 'text';
      let methodName = 'for' + _.capitalize(formType);
      if (this[methodName]) {
        formObject = this[methodName](formType, property);
      } else {
        formObject = this.forDefault(formType, property);
      }
    } else if (entity instanceof EntityDef) {

    }

    if (formObject != null) {
      formObject.setParent(parent);
    } else {
      // if formObject no created but parent is passed then use it as formobject further (grid <- add furter elements)
      formObject = parent;
    }


    if (entity instanceof EntityDef) {
      let properties = entity.getPropertyDefs();

      for (let property of properties) {
        let childObject = this._buildFormObject(property, formObject);
        formObject.insert(childObject);
      }
    } else if (entity instanceof PropertyDef) {
      // TODO for properties which points to Entity / Entities
      //property.getEntityDef
      //formObject;
      let property = <PropertyDef>entity;
      if (property.isReference()) {
        if (property.isEntityReference()) {
          let entity = property.targetRef.getEntity();
          let childObject = this._buildFormObject(entity, formObject);
          formObject.insert(childObject);
        } else {
          let properties = this.schema.getPropertiesFor(property.targetRef.getClass());
          for (let property of properties) {
            let childObject = this._buildFormObject(property, formObject);
            formObject.insert(childObject);
          }
        }
      }
    }

    formObject.postProcess();
    return formObject;

  }

  private forDefault(formType: string, property: PropertyDef) {
    let formObject = ContentComponentRegistry.createHandler(formType);
    if (formObject) {
      formObject.handle('variant', formType);
      this._applyValues(formObject, property);
      return formObject;
    }
    throw new NoFormTypeDefinedError(formType);
  }

  private forText(formType: string, property: PropertyDef) {
    return this._forInput(formType, property);
  }

  private forPassword(formType: string, property: PropertyDef) {
    return this._forInput(formType, property);
  }

  private forEmail(formType: string, property: PropertyDef) {
    return this._forInput(formType, property);
  }


  private _forInput(formType: string, property: PropertyDef) {
    let formObject = ContentComponentRegistry.createHandler('input');
    formObject.handle('variant', formType);
    this._applyValues(formObject, property);
    return formObject;
  }

  private _applyValues(formObject: FormObject, property: PropertyDef) {
    formObject.handle('name', property.name);
    formObject.handle('id', property.id());
    formObject.handle('label', property.label ? property.label : _.capitalize(property.name));
    formObject.handle('binding', property);

    let options = property.getOptions();
    if (options) {
      Object.keys(options).forEach(opt => {
        if (/^(source|target|property)/.test(opt)) return;
        let value = options[opt];
        formObject.handle(opt, value);
      });
    }

  }


  private _buildForm(data: any, parent: FormObject = null) {
    let keys = _.remove(Object.keys(data), (e: string) => ['children', 'type'].indexOf(e) === -1);

    let formObject: FormObject = null;
    if (data.type) {
      // lookup handler
      formObject = ContentComponentRegistry.createHandler(data.type);
    } else {
      throw new NoFormTypeDefinedError();
    }

    if (!this.form) {
      this.form = formObject;
    }

    formObject.setParent(parent);

    for (let key of keys) {
      let value = data[key];
      if (_.isString(value)) {
        if (/^\$/.test(value)) {
          value = new ResolveDataValue(value, formObject, key);
        }
      }
      formObject.handle(key, value);
    }


    if (data.children) {
      let value = data.children;
      if (_.isArray(value)) {
        for (let entry of value) {
          let childObject = this._buildForm(entry, formObject);
          formObject.insert(childObject);
        }
      } else {
        throw new NotYetImplementedError();
      }
    }

    formObject.postProcess();
    return formObject;

  }
}
