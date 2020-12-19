import {FormObject} from './FormObject';
import {Form} from './elements';

import {ResolveDataValue} from './ResolveDataValue';
import * as _ from 'lodash';
import {NoFormTypeDefinedError} from '../../libs/exceptions/NoFormTypeDefinedError';
import {NotYetImplementedError} from '@typexs/base/browser';
import {AbstractRef, ClassRef, IEntityRef, IPropertyRef, XS_TYPE_ENTITY, XS_TYPE_PROPERTY} from 'commons-schema-api/browser';
import {ComponentRegistry} from '../views/ComponentRegistry';

export class FormBuilder {

  private data: any;

  private form: FormObject;

  // private schema: SchemaDef;

  buildFromJSON(data: any): Form {
    this.data = data;
    // this.schema = EntityRegistry.getSchema('default');
    return <Form>this._buildForm(data);
  }


  buildFromEntity(entity: IEntityRef): Form {
    this.data = entity;
    return <Form>this._buildFormObject(entity);
  }


  private _buildFormObject(entity: IEntityRef | IPropertyRef, parent: FormObject = null, options: { level: number } = {level: 0}) {
    let formObject: FormObject = null;

    if (!this.form) {
      // this.schema = EntityRegistry.getSchema(entity.object.getSchema());
      this.form = formObject = ComponentRegistry.createHandle('form');
      formObject.handle('name', entity.id());
      formObject.handle('binding', entity);
    } else if ((<AbstractRef><any>entity).baseType === XS_TYPE_PROPERTY) {
      // TODO support also other types
      const property: IPropertyRef = <IPropertyRef>entity;

      let formType = <string>property.getOptions(<any>'form'); // || 'text';
      if (!formType) {
        // TODO Defaults for the field
        if (property.isIdentifier()) {
          formType = 'readonly';
        } else if (property.isEntityReference()) {
          formType = 'select';
        } else if (property.isReference()) {
          formType = 'grid';
        } else {
          if (property['getType'] && property['getType']() === 'boolean') {
            formType = 'checkbox';
          } else {
            formType = 'text';
          }
        }
        property.setOption('form', formType);
      }

      const methodName = 'for' + _.capitalize(formType);
      if (this[methodName]) {
        formObject = this[methodName](formType, property);
      } else {
        formObject = this.forDefault(formType, property);
      }
    } else if ((<AbstractRef><any>entity).baseType === XS_TYPE_ENTITY) {
      // TODO is this necessary
    }

    if (formObject != null) {
      formObject.setParent(parent);
    } else {
      // if formObject no created but parent is passed then use it as formobject further (grid <- add furter elements)
      formObject = parent;
    }

    const nextLevel = options.level + 1;
    if ((<AbstractRef><any>entity).baseType === XS_TYPE_ENTITY) {
      if (options.level === 0 || formObject.isStruct()) {
        const properties = (<IEntityRef>entity).getPropertyRefs();
        for (const property of properties) {
          const childObject = this._buildFormObject(property, formObject, {level: nextLevel});
          formObject.insert(childObject);
        }
      }
    } else if ((<AbstractRef><any>entity).baseType === XS_TYPE_PROPERTY) {
      // TODO for properties which points to Entity / Entities
      // property.getEntityRef
      // formObject;
      const property = <IPropertyRef>entity;
      if (property.isReference()) {
        if (property.isEntityReference()) {
          // build for new entity
          const entity = (<ClassRef>property.getTargetRef()).getEntityRef();
          this._buildFormObject(entity, formObject, {level: nextLevel});
        } else {
          // insert property form elements
          const properties = property.getTargetRef().getPropertyRefs();
          for (const property of properties) {
            const childObject = this._buildFormObject(property, formObject, {level: nextLevel});
            formObject.insert(childObject);
          }
        }
      }
    }
    formObject.postProcess();
    return formObject;
  }


  private forDefault(formType: string, property: IPropertyRef) {
    const formObject = ComponentRegistry.createHandle(formType);
    if (formObject) {
      formObject.handle('variant', formType);
      this._applyValues(formObject, property);
      return formObject;
    }
    throw new NoFormTypeDefinedError(formType);
  }


  private forText(formType: string, property: IPropertyRef) {
    return this._forInput(formType, property);
  }


  private forPassword(formType: string, property: IPropertyRef) {
    return this._forInput(formType, property);
  }


  private forHidden(formType: string, property: IPropertyRef) {
    return this._forInput(formType, property);
  }


  private forReadonly(formType: string, property: IPropertyRef) {
    const input = this._forInput('text', property);
    input.handle('readonly', true);
    return input;
  }


  private forEmail(formType: string, property: IPropertyRef) {
    return this._forInput(formType, property);
  }

  private _forInput(formType: string, property: IPropertyRef) {
    const formObject = ComponentRegistry.createHandle('input');
    formObject.handle('variant', formType);
    this._applyValues(formObject, property);
    return formObject;
  }


  private _applyValues(formObject: FormObject, property: IPropertyRef) {
    formObject.handle('name', property.name);
    formObject.handle('id', property.id());
    formObject.handle('label', property.label() ? property.label() : _.capitalize(property.name));
    formObject.handle('binding', property);

    const options = property.getOptions();
    if (options) {
      _.keys(options).forEach(opt => {
        if (/^(source|target|property|name)/.test(opt)) {
          return;
        }
        const value = options[opt];
        formObject.handle(opt, value);
      });
    }
  }


  private _buildForm(data: any, parent: FormObject = null) {
    const keys = _.remove(Object.keys(data), (e: string) => ['children', 'type'].indexOf(e) === -1);

    let formObject: FormObject = null;
    if (data.type) {
      // lookup handle
      formObject = ComponentRegistry.createHandle(data.type);
    } else {
      throw new NoFormTypeDefinedError();
    }

    if (!this.form) {
      this.form = formObject;
    }

    formObject.setParent(parent);

    for (const key of keys) {
      let value = data[key];
      if (_.isString(value)) {
        if (/^\$/.test(value)) {
          value = new ResolveDataValue(value, formObject, key);
        }
      }
      formObject.handle(key, value);
    }


    if (data.children) {
      const value = data.children;
      if (_.isArray(value)) {
        for (const entry of value) {
          const childObject = this._buildForm(entry, formObject);
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
