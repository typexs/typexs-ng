import {PropertyDef} from 'typexs-schema/libs/PropertyDef';
import * as _ from 'lodash';

import {ResolveDataValue} from './ResolveDataValue';


export abstract class FormObject {

  readonly type: string;

  id: string;

  usedKeys: string[] = [];

  index: number;

  name: string;

  label: string;

  help: string;

  readonly: false;

  private binding: PropertyDef = null;

  private parent: FormObject = null;

  private children: FormObject[] = [];


  getBinding() {
    return this.binding;
  }

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

  getPath(): string {
    let arr = [];

    if (this.getBinding() instanceof PropertyDef) {
      if (this.getParent()) {
        arr.push(this.getParent().getPath());
      }
      arr.push(this.name);
      if (this.getBinding().isCollection()) {
        arr.push('$idx');
      }
    }
    return _.filter(arr,x => x.trim() != "").join('.');
  }


  getForm(): FormObject {
    if (this.parent) {
      return this.parent.getForm();
    } else if (this.type == 'form') {
      return this;
    } else {
      // TODO throw error this should never happen
      return null;
    }
  }

  handle(key: string, value: any) {

    if (value instanceof ResolveDataValue) {
      let form = this.getForm(); //
      form['resolver'].push(value);
    }

    this.usedKeys.push(key);
    let methodName = 'handle' + _.capitalize(key);
    if (this[methodName]) {
      this[methodName](value);
    } else {
      this[key] = value;
    }
  }

  /**
   * Don't override type
   * @param {string} value
   */
  handleType(value: string) {
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
