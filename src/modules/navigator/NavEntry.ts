import {Route} from '@angular/router';
import * as _ from 'lodash';

export class NavEntry {

  static inc: number = 0;

  readonly id: number = 0;

  path: string;

  realPath: string = null;

  route: Route = null;

  paths: string[] = [];

  label: string;

  parent: NavEntry = null;

  params: any = {};

  group?: string;

  groupRegex?: string = null;

  // level: number = 0;

  outlet: string = null;

  //groupPattern: string = null;

  constructor() {
    this.id = NavEntry.inc++;
  }

  parse(route: Route) {
    this.route = route;
    this.path = this.realPath = route.path;
    this.paths = this.path.split('/');
    let fixedPath = [];

    for (let i = 0; i < this.paths.length; i++) {
      const entry = this.paths[i];
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

  setParent(route: NavEntry) {
    if (this.parent != route) {
      this.parent = route;
    }
  }

  getParentId() {
    if (this.parent) return this.parent.id;
    return -1;
  }

  getComponentName() {
    if (this.route && this.route.component) return this.route.component.name;
    return null;
  }

  setRealPath(s: string) {
    this.realPath = s;
  }

  getRealPath() {
    return this.realPath;
  }

  getFullPath(): string {
    let path = [];
    if (this.parent) {
      path.push(this.parent.getFullPath());
    }
    path.push(this.path);
    return path.join('/');
    /*
    if (this.outlet && false) {
      let outlets = {};
      outlets[this.outlet] = '/'+this.path;
      let str = {outlets: outlets};
      console.log(str);
      return str;
    } else {
      return this.path;
    }
    */
  }

  isRedirect() {
    if (this.route && this.route.redirectTo) {
      return true;
    }
    return false;
  }

  getParentPath(): string {
    let path = this.getFullPath();
    let f = path.split('/');
    f.pop();
    return f.join('/');
  }


}
