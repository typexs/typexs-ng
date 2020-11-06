import {Route} from '@angular/router';
import * as _ from 'lodash';

export class NavEntry {

  static inc = 0;

  readonly id: number = 0;

  ignore = false;

  private fixedPath = false;

  private orgPath: string = null;

  data: any = {};

  path: string;

  route: Route;

  paths: string[] = [];

  label: string;

  parent: NavEntry = null;

  params: any = {};

  groups?: string[];

  groupRegex?: string = null;

  outlet: string = null;


  constructor() {
    this.id = NavEntry.inc++;
  }


  parse(route: Route) {
    this.route = route;
    // save original path
    this.orgPath = this.route.path;
    route['navId'] = this.id;
    this.path = route.path;
    this.paths = this.path.split('/');
    const fixedPath = [];

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

  parseData(data: any) {
    if (data) {
      if (_.has(data, 'label')) {
        this.label = data.label;
      }
      if (_.has(data, 'group') || _.has(data, 'groups')) {
        const groups = _.get(data, 'group', _.get(data, 'groups'));
        this.groups = _.isArray(groups) ? groups : [groups];
      }
      if (_.has(data, 'skip')) {
        this.ignore = data.skip;
      }

      this.data = data;
    }
  }


  getCanActivate() {
    if (_.has(this.route, 'canActivate')) {
      return this.route.canActivate;
    }
    return false;
  }


  asGroup(pattern: any, data: any) {
    this.route = {
      data: data ? data : {}
    };
    this.parseData(data);
    this.groupRegex = pattern;
    if (_.has(data, 'canActivate')) {
      this.route.canActivate = data.canActivate;
    }
  }

  getPermissions() {
    if (_.has(this.route, 'data.permissions')) {
      return _.get(this.route, 'data.permissions', []);
    }
    return null;
  }

  isGroup() {
    return !!this.groupRegex;
  }

  hasRoute() {
    return !!this.route;
  }

  markAsFixedPath() {
    this.fixedPath = true;
  }

  setParent(route: NavEntry) {
    if (this.parent !== route && this !== route) {
      const localPath = this.getFullPath();
      this.parent = route;
      if (!this.fixedPath) {
        const parentPath = this.parent.getFullPath();
        if (localPath && localPath.startsWith(parentPath + '/')) {
          this.path = localPath.replace(parentPath + '/', '');
        }
      }
    }
  }

  getPath() {
    return this.path;
  }

  getLevel(): number {
    if (this.parent) {
      return this.parent.getLevel() + 1;
    }
    return 0;
  }

  getParentId() {
    if (this.parent) {
      return this.parent.id;
    }
    return -1;
  }

  getComponentName() {
    if (this.route && this.route.component) {
      return this.route.component.name;
    }
    return null;
  }


  getFullPath(): string {
    if (this.fixedPath) {
      return this.path;
    }
    const path = [];
    if (this.parent) {
      path.push(this.parent.getFullPath());
    }
    if (this.path) {
      path.push(this.path);
    }
    return path.filter(x => !_.isEmpty(x)).join('/');
  }


  isRedirect() {
    if (this.route && this.route.redirectTo) {
      return true;
    }
    return false;
  }

  isLazyLoading() {
    if (this.route && this.route.loadChildren) {
      return true;
    }
    return false;
  }


  isLazyLoaded() {
    return this.isLazyLoading() && _.has(this.route, '_loadedConfig.routes');
  }

  toIgnore() {
    return this.ignore;
  }

  getParentPath(): string {
    const path = this.getFullPath();
    const f = path.split('/');
    f.pop();
    return f.join('/');
  }

  getNearestRoute(): Route {
    if (this.route) {
      return this.route;
    } else if (this.parent) {
      return this.parent.getNearestRoute();
    }
    return null;
  }

  getNearestPath(): string {
    if (this.path) {
      return this.path;
    } else if (this.parent) {
      return this.parent.getNearestPath();
    }
    return null;
  }

}
