import {FormObject} from './FormObject';
import {Form} from './elements';

import {ResolveDataValue} from './ResolveDataValue';
import * as _ from 'lodash';
import {NoFormTypeDefinedError} from '../../libs/exceptions/NoFormTypeDefinedError';
import {ContentComponentRegistry} from '../views/ContentComponentRegistry';
import {EntityRef, PropertyRef} from '@typexs/schema/browser';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {NotYetImplementedError} from "@typexs/base/browser"
import {IPropertyRef} from 'commons-schema-api/browser';

export class FormBuilder {

  private data: any;

  private form: FormObject;

  // private schema: SchemaDef;

  buildFromJSON(data: any): Form {
    this.data = data;
    // this.schema = EntityRegistry.getSchema('default');
    return <Form>this._buildForm(data);
  }


  buildFromEntity(entity: EntityRef): Form {
    this.data = entity;
    return <Form>this._buildFormObject(entity);
  }


  private _buildFormObject(entity: EntityRef | PropertyRef, parent: FormObject = null, options: { level: number } = {level: 0}) {
    let formObject: FormObject = null;

    if (!this.form) {
      // this.schema = EntityRegistry.getSchema(entity.object.getSchema());
      this.form = formObject = ContentComponentRegistry.createHandler('form');
      formObject.handle('name', entity.id());
      formObject.handle('binding', entity);
    } else if (entity instanceof PropertyRef) {
      // TODO support also other types
      let property = entity;

      let formType = <string>property.getOptions(<any>'form');// || 'text';
      if (!formType) {
        // TODO Defaults for the field
        if (property.identifier) {
          formType = 'readonly';
        } else if (property.isEntityReference()) {
          formType = 'select';
        } else if (property.isReference()) {
          formType = 'grid';
        } else {
          if (property.dataType == 'boolean') {
            formType = 'checkbox';
          } else {
            formType = 'text';
          }
        }
        property.setOption('form', formType);
      }

      let methodName = 'for' + _.capitalize(formType);
      if (this[methodName]) {
        formObject = this[methodName](formType, property);
      } else {
        formObject = this.forDefault(formType, property);
      }
    } else if (entity instanceof EntityRef) {
      // TODO is this necessary
    }

    if (formObject != null) {
      formObject.setParent(parent);
    } else {
      // if formObject no created but parent is passed then use it as formobject further (grid <- add furter elements)
      formObject = parent;
    }

    const nextLevel = options.level + 1;
    if (entity instanceof EntityRef) {
      if(options.level == 0 || formObject.isStruct()){
        let properties = entity.getPropertyRefs();
        for (let property of properties) {
          let childObject = this._buildFormObject(property, formObject,{level:nextLevel});
          formObject.insert(childObject);
        }
      }
    } else if (entity instanceof PropertyRef) {
      // TODO for properties which points to Entity / Entities
      //property.getEntityRef
      //formObject;
      let property = <PropertyRef>entity;
      if (property.isReference()) {
        if (property.isEntityReference()) {
          // build for new entity
          let entity = <EntityRef>property.getTargetRef().getEntityRef();
          this._buildFormObject(entity, formObject,{level:nextLevel});
        } else {
          // insert property form elements
          let properties = EntityRegistry.getPropertyRefsFor(property.targetRef);
          for (let property of properties) {
            let childObject = this._buildFormObject(property, formObject,{level:nextLevel});
            formObject.insert(childObject);
          }
        }
      }
    }
    formObject.postProcess();
    return formObject;
  }


  private forDefault(formType: string, property: IPropertyRef) {
    let formObject = ContentComponentRegistry.createHandler(formType);
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
    let input = this._forInput('text', property);
    input.handle('readonly', true);
    return input;
  }


  private forEmail(formType: string, property: IPropertyRef) {
    return this._forInput(formType, property);
  }

  private _forInput(formType: string, property: IPropertyRef) {
    let formObject = ContentComponentRegistry.createHandler('input');
    formObject.handle('variant', formType);
    this._applyValues(formObject, property);
    return formObject;
  }


  private _applyValues(formObject: FormObject, property: IPropertyRef) {
    formObject.handle('name', property.name);
    formObject.handle('id', property.id());
    formObject.handle('label', property.label() ? property.label() : _.capitalize(property.name));
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
