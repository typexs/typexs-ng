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
      if(_.isEmpty(realPath) || entry.isRedirect()){
        continue;
      }
      let split = realPath.split('/');
      let parentEntry = this.findMatch(realPath);
      /*
      while (split.length > 0 && parentEntry == null) {
        split.pop();
        const s = split.join('/');
        parentEntry = _.find(this.entries, e => e.getRealPath() == s && !e.isRedirect());
      }
      */

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
    let routes = _.map(_routes, route => {
      let r = route.route;
      if (parent) {
        r.path = r.path.replace(parent.path + '/', '');
      }
      if(!route.isRedirect()){
        r.children = this.rebuildRoutes(route);
      }
      return r;
    });

    return routes;
  }


  getRoots() {
    return _.filter(this.entries, e => e.parent == null);
  }


  getEntry(path: string) {
    return _.find(this.entries, e => e.getRealPath() == path);
  }

  addGroupEntry(pattern: string, data: any) {
    let navEntry = new NavEntry();
    navEntry.label = data.label;
    navEntry.group = data.group;

    let split = pattern.split('/');
    let length = split.length;
    let pathBase: string[] = [];
    let base = this.findMatch(pattern);

    if (base) {
      const idx = this.entries.indexOf(base);
      //_.insert(this.entries)
      this.entries.splice(idx + 1, 0, navEntry);
      navEntry.setParent(base);

      let children = _.filter(this.entries, e =>
        e.route != null &&
        e.getRealPath().split('/').length == length &&
        e.getRealPath().startsWith(base.getRealPath())
      );
      _.map(children, c => c.setParent(navEntry));
    } else {
      // TODO
    }


  }


  getTree(from: string | NavEntry = null, filter?: (entry: NavEntry) => boolean): INavTreeEntry[] {
    let fromEntry = !_.isNull(from) ? (from instanceof NavEntry ? from : this.getEntry(from)) : null;
    let _routes: NavEntry[] = _.filter(this.entries, e => e.parent == fromEntry && (filter ? filter(e) : true) && !e.isRedirect());
    let routes = _.map(_routes, route => {
      let r: INavTreeEntry = {label: route.label, group: route.group, isGroup: false};
      if (route.route) {
        r.path = route.getRealPath();
      } else {
        r.isGroup = true;
      }
      r.children = this.getTree(route);
      return r;
    });

    return routes;
  }


  findMatch(path: string) {
    let split = path.split('/');
    let base = null;
    while (split.length > 0 && base == null) {
      split.pop();
      base = _.find(this.entries, e => e.route != null && e.getRealPath() == split.join('/') && !e.isRedirect());
    }
    return base;
  }

  getEntries() {
    return this.entries;
  }


  getEntriesByGroup(group: string) {
    return _.filter(this.entries, e => e.group == group);
  }


  getEntriesByPathPattern(regex: RegExp) {
    return _.filter(this.entries, e => regex.test(e.path));
  }

}
