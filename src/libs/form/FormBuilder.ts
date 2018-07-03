import {NotYetImplementedError} from 'typexs-base/libs/exceptions/NotYetImplementedError';
//import {EntityDef as XsEntityDef, PropertyDef as XsPropertyDef} from 'typexs-schema';
import * as _ from 'lodash';
import {FormObject} from './FormObject';
import {Form} from './elements';
import {FormRegistry} from './FormRegistry';
import {NoFormTypeDefinedError} from './exceptions/NoFormTypeDefinedError';
import {ResolveDataValue} from './ResolveDataValue';
import {EntityDef} from 'typexs-schema/libs/EntityDef';
import {PropertyDef} from 'typexs-schema/libs/PropertyDef';

export class FormBuilder {

  private data: any;

  private form: FormObject;


  buildFromJSON(data: any): Form {
    this.data = data;

    return <Form>this._buildForm(data);

  }

  buildFromXsEntity(entity: EntityDef): Form {
    this.data = entity;

    return <Form>this._buildFormXs(entity);

  }

  private _buildFormXs(entity: EntityDef | PropertyDef, parent: FormObject = null) {

    let formObject: FormObject = null;

    if (!this.form) {
      this.form = formObject = FormRegistry.createHandler('form');
      formObject.handle('name', entity.id());
      formObject.handle('binding', entity);
    } else if (entity instanceof PropertyDef) {
      // TODO support also other types
      let property = entity;
      let formType = <string>property.getOptions('form') || 'text';
      if (formType === 'text' || formType === 'password') {
        // lookup handler
        formObject = FormRegistry.createHandler('input');
        formObject.handle('name', property.name);
        formObject.handle('id', property.id());
        formObject.handle('label', property.label);
        formObject.handle('variant', formType);
        formObject.handle('binding', property);

      } else {
        throw new NoFormTypeDefinedError(formType);
      }
    }

    formObject.setParent(parent);

    if (entity instanceof EntityDef) {
      let properties = entity.getPropertyDefs();

      for (let property of properties) {
        let childObject = this._buildFormXs(property, formObject);
        formObject.insert(childObject);
      }
    } else if (entity instanceof PropertyDef) {
      // TODO for properties which points to Entity / Entities
      //property.getEntityDef
      //formObject;
    }

    formObject.postProcess();
    return formObject;

  }


  private _buildForm(data: any, parent: FormObject = null) {
    let keys = _.remove(Object.keys(data), (e) => ['children', 'type'].indexOf(e) === -1);

    let formObject: FormObject = null;
    if (data.type) {
      // lookup handler
      formObject = FormRegistry.createHandler(data.type);
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
