import * as _ from 'lodash';
import {XInputComponent} from '../xinput.component';
import {NotYetImplementedError} from '../../../libs/xschema/NotYetImplementedError';
import {XSEntityDef, XSPropertyDef} from '../../../libs/xschema/XSRegistry';

export class XsFormRegistry {

  static components = [
    {type: 'input', component: XInputComponent}
  ];

  private static formHandler: IXsFormHandlerDef[] = [];

  static addHandler(typeName: string, klass: Function) {
    this.formHandler.push({type: typeName, handler: klass});
  }

  static createHandler(typeName: string) {
    let handler = _.find(this.formHandler, {type: typeName});
    if (!handler) {
      throw new NoFormHandlerDefinedForType(typeName);
    }
    let obj = Reflect.construct(handler.handler, []);
    obj.type = typeName;
    return obj;
  }

}

export abstract class FormObject {

  readonly type: string;

  usedKeys: string[] = [];
  // property: XSPropertyDef;

  id: string;

  index: number;

  name: string;

  label: string;

  private binding: XSPropertyDef = null;

  private parent: FormObject = null;

  private children: FormObject[] = [];


  insert(object: FormObject) {
    object.parent = this;
    object.index = this.children.length;
    this.children.push(object);
  }

  getUsedKeys() {
    return this.usedKeys;
  }

  getParent() {
    return this.parent;
  }

  setParent(parent: FormObject) {
    if (parent) {
      this.parent = parent;
      this.index = this.parent.children.indexOf(this);
    }
  }

  getChildren() {
    return this.children;
  }


  getForm(): XsForm<any> {
    if (this.parent) {
      return this.parent.getForm();
    } else if (this instanceof XsForm) {
      return <XsForm<any>>this;
    } else {
      // TODO throw error this should never happen
      return null;
    }
  }

  handle(key: string, value: any) {
    if (value instanceof ResolveDataValue) {
      this.getForm().resolver.push(value);
    }

    this.usedKeys.push(key);
    let methodName = 'handle' + _.startCase(key);
    if (this[methodName]) {
      this[methodName](value);
    } else {
      this[key] = value;
    }
  }


  postProcess() {
  }


  replace(someObject: FormObject) {
    let parent = this.getParent();
    let idx = parent.getChildren().indexOf(this);
    if (idx < 0) {
      throw new Error('can not find index, something is wrong');
    }
    parent.getChildren()[idx] = someObject;
    someObject.setParent(parent);
    return someObject;
  }
}

@XsFormHandler('form')
export class XsForm<T> extends FormObject {

  dataContainer: T;

  resolver: IResolver[] = [];

  combine(otherForm: XsForm<T>) {
    let resolverCache: IResolver[] = [];

    while (this.resolver.length > 0) {
      let resolver = this.resolver.shift();
      if (resolver instanceof ResolveDataValue) {
        resolver.resolve(otherForm);
      } else {
        resolverCache.push(resolver);
      }
    }

    while (resolverCache.length > 0) {

      let resolver = resolverCache.shift();
      if (resolver instanceof ReferenceResolver) {
        resolver.resolve(otherForm);
      }
    }

    return this;
  }

  get(path: string) {
    let _path = path.split('.');
    let tmpElem: FormObject = this;
    let element = null;
    while (_path.length > 0) {
      let _p = _path.shift();
      tmpElem = _.find(tmpElem.getChildren(), {name: _p});
      if (!tmpElem) {
        break;
      } else {
        element = tmpElem;
      }
    }
    return _path.length == 0 && element ? element : null;

  }

}

export class NoFormTypeDefinedError extends Error {
}

export class NoFormHandlerDefinedForType extends Error {
  constructor(typeName: string) {
    super(typeName + ' not defined');
  }
}


export class ResolveDataValue implements IResolver {

  private orgValue: string;

  private path: string[] = [];

  private fetchKey: string = null;

  private property: string = null;

  private object:FormObject=null;

  constructor(value: string, object:FormObject, property:string) {
    this.property = property;
    this.object = object;
    this.orgValue = value.replace(/^\$/, '');
    this.path = this.orgValue.split('.');
    this.fetchKey = this.path.pop();
  }

  get() {
    return this.orgValue;
  }


  resolve(form: XsForm<any>) {
    let elem = form.get(this.path.join('.'));
    if (elem) {
      this.object[this.property] = elem[this.fetchKey];
      return elem[this.fetchKey];
    } else {
      throw new Error('cant resolve data');
    }

  }

}


export class XsFormBuilder<T> {

  private data: any;

  private form: FormObject;


  buildFromJSON(data: any): XsForm<any> {
    this.data = data;

    return <XsForm<any>>this._buildForm(data);

  }

  buildFromXsEntity(entity: XSEntityDef): XsForm<any> {
    this.data = entity;

    return <XsForm<any>>this._buildFormXs(entity);

  }

  private _buildFormXs(entity: XSEntityDef | XSPropertyDef, parent: FormObject = null) {

    let formObject: FormObject = null;

    if (!this.form) {
      this.form = formObject = XsFormRegistry.createHandler('form');
      formObject.handle('name', entity.id());
      formObject.handle('binding', entity);
    } else if (entity instanceof XSPropertyDef) {
      // TODO support also other types
      let property = entity;
      let formType = <string>property.getOptions('form') || 'text';
      if (formType === 'text' || formType === 'password') {
        // lookup handler
        formObject = XsFormRegistry.createHandler('input');
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

    if (entity instanceof XSEntityDef) {
      let properties = entity.getPropertyDefs();

      for (let property of properties) {
        let childObject = this._buildFormXs(property, formObject);
        formObject.insert(childObject);
      }
    } else if (entity instanceof XSPropertyDef) {
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
      formObject = XsFormRegistry.createHandler(data.type);
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


//


@XsFormHandler('input')
export class InputElem extends FormObject {
  variant: string = 'text';
}

@XsFormHandler('tab')
export class TabElem extends FormObject {

}


@XsFormHandler('tabs')
export class TabsElem extends FormObject {

}

@XsFormHandler('ref')
export class ReferenceResolver extends FormObject implements IResolver {

  use: string;

  postProcess() {
    this.getForm().resolver.push(this);
  }

  resolve(form:XsForm<any>){
    let elem = form.get(this.use);
    let e = _.clone(elem);
    this.replace(e);

    // copy properties
    this.getUsedKeys().forEach(k => {
      e.handle(k, this[k]);
    });

  }
}


export interface IResolver {
  resolve(form: XsForm<any>) :void ;
}


export function XsFormHandler(typeName: string) {
  return function (object: Function) {
    XsFormRegistry.addHandler(typeName, object);
  };
}


interface IXsFormHandlerDef {
  type: string,
  handler: Function
}
