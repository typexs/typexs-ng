import {filter as _filter, isEmpty as _isEmpty} from 'lodash';


export class Name {

  name: string;
  idx: number = -1;
  parent: Name;


  child(_name: string = null, idx: number = -1) {
    let name = new Name();
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

}
