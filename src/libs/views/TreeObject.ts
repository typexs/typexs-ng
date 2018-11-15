import {Context} from './Context';


export abstract class TreeObject {

  readonly type: string;

  context: Context;

  index: number;

  parent: TreeObject = null;

  children: TreeObject[] = [];

  insert(object: TreeObject) {
    object.parent = this;
    object.index = this.children.length;
    this.children.push(object);
  }

  getParent(): TreeObject {
    return this.parent;
  }

  setParent(parent: TreeObject) {
    if (parent) {
      this.parent = parent;
      this.index = this.parent.children.indexOf(this);
    }
  }

  getChildren() {
    return this.children;
  }
}
