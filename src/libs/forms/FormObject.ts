import {PropertyDef} from '@typexs/schema/libs/registry/PropertyDef';

import * as _ from 'lodash';
import {ResolveDataValue} from './ResolveDataValue';
import {TreeObject} from '../views/TreeObject';


export function isFormObject(obj: TreeObject | FormObject): obj is FormObject {
  return obj instanceof FormObject;
}

export abstract class FormObject extends TreeObject {

  id: string;

  usedKeys: string[] = [];

  name: string;

  label: string;

  help: string;

  // to mark element as read only
  private readonly: boolean = false;

  private selectable: boolean = false;

  private multiple: boolean = false;

  private struct: boolean = false;

  private limited: number = -1;

  protected replicable: boolean = false;

  private binding: PropertyDef = null;


  isSelection() {
    return this.selectable;
  }


  isStruct() {
    return this.struct;
  }

  isReadonly() {
    return this.readonly;
  }

  isMultiple() {
    return this.multiple;
  }

  isReplicable() {
    return this.replicable;
  }

  getBinding() {
    return this.binding;
  }

  getUsedKeys() {
    return this.usedKeys;
  }

  getPath(): string {
    let arr = [];

    if (this.getBinding() instanceof PropertyDef) {
      if (this.getParent()) {
        const parent = this.getParent();
        if (isFormObject(parent)) {
          arr.push(parent.getPath());
        } else {
          //  throw new Error('parent is not a form object');
        }
      }
      arr.push(this.name);
      if (this.getBinding().isCollection()) {
        arr.push('$idx');
      }
    }
    return _.filter(arr, (x: string) => x.trim() != '').join('.');
  }


  getForm(): FormObject {
    if (this.parent && isFormObject(this.parent)) {
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
   */
  private handleType(value: string) {
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

  getEnum(){
    return this.getBinding().getOptions(<any>'enum');
  }

  protected handleEnum(value: any) {
    this.handle('selectable',true);
  }

  protected handleCardinality(value: number) {
    if(value == 0 || value > 1){
      this.handle('multiple',true);
      if(value > 1){
        this.handle('limited',value);
      }
    }

  }

}
