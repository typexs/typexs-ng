import {Route} from '@angular/router';
import * as _ from 'lodash';

export class NavEntry {

  static inc: number = 0;

  readonly id: number = 0;

  ignore: boolean = false;

  path: string;

  realPath: string = null;

  route: Route = null;

  paths: string[] = [];

  label: string;

  parent: NavEntry = null;

  params: any = {};

  groups?: string[];

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

    this.parseData(route.data);

    if (!this.label) {
      this.label = !_.isEmpty(fixedPath) ? _.capitalize(_.last(fixedPath)) : 'Undefined';
    }


    // TODO has path parent
    // TODO has path placeholder
    // TODO has level
  }
  
  parseData(data:any){
    if (data) {
      if (_.has(data, 'label')) {
        this.label = data.label;
      }
      if (_.has(data, 'group') || _.has(data, 'groups')) {
        let groups = _.get(data, 'group', _.get(data, 'groups'));
        this.groups = _.isArray(groups) ? groups : [groups];
      }
      if (_.has(data, 'skip')) {
        this.ignore = data.skip;
      }
    }
  }

  setParent(route: NavEntry) {
    if (this.parent != route) {
      this.parent = route;
    }
  }

  getLevel(): number {
    if (this.parent) {
      return this.parent.getLevel() + 1;
    }
    return 0;
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
  }


  isRedirect() {
    if (this.route && this.route.redirectTo) {
      return true;
    }
    return false;
  }

  toIgnore() {
    return this.ignore;
  }

  getParentPath(): string {
    let path = this.getFullPath();
    let f = path.split('/');
    f.pop();
    return f.join('/');
  }


}
