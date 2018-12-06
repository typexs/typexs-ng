import {Inject, Injectable} from '@angular/core';
import {NavEntry} from './NavEntry';
import {Router, Routes} from '@angular/router';
import {INavTreeEntry} from './INavTreeEntry';
import * as _ from 'lodash';


@Injectable()
export class NavigatorService {

  entries: NavEntry[] = [];

  private router: Router;

  constructor(@Inject(Router) router: Router) {
    this.router = router;
    this.router.events.subscribe(this.onRouterEvent.bind(this));
    this.read(this.router.config);
    let routes2 = this.getRebuildRoutes();
    this.router.resetConfig(routes2);
    this.read(this.router.config);
  }


  onRouterEvent(event: any) {
    // TODO
  }


  readRoutes(config: Routes, parent: NavEntry = null) {
    for (let route of config) {
      let entry = new NavEntry();
      entry.parse(route);
      if (parent && parent != entry) {
        entry.setParent(parent);
        entry.setRealPath(entry.getFullPath());
      }
      this.entries.push(entry);
      if (route.children && !_.isEmpty(route.children)) {
        this.readRoutes(route.children, entry);
      }
    }
  }


  read(routes: Routes) {
    this.entries = [];
    this.readRoutes(routes);

    for (let entry of this.entries) {
      const realPath = entry.getRealPath();
      if (_.isEmpty(realPath) || entry.isRedirect()) {
        continue;
      }
      let parentEntry = this.findMatch(realPath);
      if (parentEntry && parentEntry != entry) {
        entry.setParent(parentEntry);
      }
    }
  }


  getRebuildRoutes(): Routes {
    return this.rebuildRoutes();
  }


  private rebuildRoutes(parent: NavEntry = null): Routes {
    let _routes: NavEntry[] = _.filter(this.entries, e => e.parent == parent);
    let routes:Routes = [];
    while(_routes.length > 0){
      let route = _routes.shift();
      let r = route.route;
      // if route exists
      if (r) {
        if (parent) {
          let parentPath = parent.getNearestPath();
          r.path = r.path.replace(parentPath + '/', '');
        }
        if (!route.isRedirect()) {
          r.children = this.rebuildRoutes(route);
        }
        routes.push(r);
      }else{
        let children =  _.filter(this.entries, e => e.parent == route);
        children.forEach(c => _routes.push(c));
      }
    }
    return routes;
  }


  getRoots() {
    return _.filter(this.entries, e => e.parent == null);
  }


  getEntry(path: string) {
    return _.find(this.entries, e => e.getRealPath() == path);
  }


  getEntryBy(path: string, cb: Function) {
    return _.find(this.entries, cb);
  }

  addGroupEntry(pattern: string, data: any) {
    let navEntry = new NavEntry();
    navEntry.parseData(data);
    navEntry.groupRegex = pattern;

    let split = pattern.split('/');
    let length = split.length;
    let base = this.findMatch(pattern);

    if (base) {
      let regex = new RegExp(pattern);
      const idx = this.entries.indexOf(base);
      //_.insert(this.entries)
      this.entries.splice(idx + 1, 0, navEntry);
      navEntry.setParent(base);

      let children = _.filter(this.entries, e =>
        e.route != null &&
        e.getRealPath().split('/').length == length &&
        regex.test(e.getRealPath())
      );
      _.map(children, c => c.setParent(navEntry));
    } else {
      // TODO
    }

  }


  getTree(from: string | NavEntry = null, filter?: (entry: NavEntry) => boolean): INavTreeEntry[] {
    let fromEntry = !_.isNull(from) ? (from instanceof NavEntry ? from : this.getEntry(from)) : null;
    let _routes: NavEntry[] = _.filter(this.entries, e => e.parent == fromEntry && (filter ? filter(e) : true) && !e.isRedirect() && !e.toIgnore());
    let routes = _.map(_routes, route => {
      let r: INavTreeEntry = {
        label: route.label,
        isGroup: false,
        entry: route
      };
      if (route.route) {
        r.path = route.getRealPath();
      } else {
        r.isGroup = true;
      }
      if (route.groups) {
        r.groups = route.groups;
      }
      r.children = this.getTree(route, filter);
      return r;
    });
    return routes;
  }


  findMatch(path: string) {
    let split = path.split('/');
    let base = null;
    while (split.length > 0 && base == null) {
      split.pop();
      base = _.find(this.entries, e => e.route != null && e.getRealPath() == split.join('/') && !e.isRedirect() && !e.toIgnore());
    }
    return base;
  }


  getEntries() {
    return this.entries;
  }


  getEntriesByGroup(group: string) {
    return _.filter(this.entries, e => e.groups.indexOf(group) !== -1);
  }


  getEntriesByPathPattern(regex: RegExp) {
    return _.filter(this.entries, e => regex.test(e.path));
  }

}
