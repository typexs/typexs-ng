import {filter as _filter, isEmpty as _isEmpty, has as _has, get as _get} from 'lodash';


export type ALIGNMENT = 'vertical' | 'horizontal'

export type LABEL_DISPLAY = 'top' | 'inline' | 'none'

export class Context {

  name: string;

  idx: number = -1;

  parent: Context;

  labelDisplay: LABEL_DISPLAY;

  // alignment:

  child(_name: string = null, idx: number = -1) {
    let name = new Context();
    name.parent = this;
    name.name = _name;
    name.idx = idx;
    return name;
  }


  path(): string {
    let arr: string[] = [];
    if (this.parent) {
      arr = this.parent.path().split('.');
    }

    if (this.idx > -1) {
      arr[arr.length - 1] = arr[arr.length - 1] + '[' + this.idx + ']';
      // arr.push(this.name + '[' + this.idx + ']');
    } else {
      arr.push(this.name);
    }
    //  console.log(arr);
    return _filter(arr, x => !_isEmpty(x)).join('.');
  }


  get(key: string, _default: any = null): any {
    if (_has(this, key)) {
      return _get(this, key, _default);
    } else if (this.parent) {
      return this.parent.get(key);
    }
    return _default;
  }

}
