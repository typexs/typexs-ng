import {Inject, Injectable} from '@angular/core';
import {NavEntry} from './NavEntry';
import {Route, Router, Routes} from '@angular/router';
import _ = require('lodash');


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
      if (parent) {
        entry.setParent(parent);
        entry.setRealPath(entry.getFullPath());
      }
      /*
      const fullPath = entry.getFullPath();
      const parentPath = entry.getParentPath();
      this.pathCache[fullPath] = parentPath;
      */
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
      let split = realPath.split('/');
      let parentEntry = null;
      while (split.length > 0 && parentEntry == null) {
        split.pop();
        const s = split.join('/');
        parentEntry = _.find(this.entries, e => e.getRealPath() == s);
      }

      if (parentEntry) {
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
      if(parent){
        r.path = r.path.replace(parent.path + '/','');
      }
      r.children = this.rebuildRoutes(route);
      return r;
    });

    return routes;
  }


  addGroupLabel(pattern: string | RegExp, label: string) {
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
