import {Route} from '@angular/router';
import * as _ from 'lodash';

export class NavEntry {

  path: string;

  label: string;

  parent: NavEntry = null;

  params: any = {};

  group?: string;

  level: number = 0;

  outlet: string = null;

  parse(route: Route, parent:NavEntry = null) {
    this.path = route.path;
    this.parent = this.parent;

    const pathSplit = this.path.split('/');
    let fixedPath = [];

    for (let i = 0; i < pathSplit.length; i++) {
      const entry = pathSplit[i];
      if (entry.startsWith(':')) {
        // is placeholder
        this.params[entry.replace(/^:/, '')] = i;
      } else {
        fixedPath.push(entry);
      }
    }

    if (route.outlet) {
      this.outlet = route.outlet;
    }

    if (route.data) {
      ['label', 'group', 'outlet'].forEach(k => {
        if (_.has(route.data, k)) {
          this[k] = route.data[k];
        }
      });
    }

    if (!this.label) {
      this.label = !_.isEmpty(fixedPath) ? _.capitalize(_.last(fixedPath)) : 'Undefined';
    }


    // TODO has path parent
    // TODO has path placeholder
    // TODO has level
  }

  getPath() {
    if (this.outlet && false) {
      let outlets = {};
      outlets[this.outlet] = '/'+this.path;
      let str = {outlets: outlets};
      console.log(str);
      return str;
    } else {
      return this.path;
    }
  }

  parentPath() {
    let split = this.path.split('/');
    split.pop();
    return split.join('/');
  }

}
