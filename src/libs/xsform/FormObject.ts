import {PropertyDef} from 'typexs-schema';
import * as _ from 'lodash';
import {Form} from './elements/Form';
import {ResolveDataValue} from './ResolveDataValue';

export abstract class FormObject {

  readonly type: string;

  usedKeys: string[] = [];
  // property: XsPropertyDef;

  id: string;

  index: number;

  name: string;

  label: string;

  private binding: PropertyDef = null;

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


  getForm(): Form<any> {
    if (this.parent) {
      return this.parent.getForm();
    } else if (this instanceof Form) {
      return <Form<any>>this;
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
