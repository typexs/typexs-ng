import {Inject, Injectable} from '@angular/core';
import {NavEntry} from './NavEntry';
import {Route, RouteConfigLoadEnd, Router, Routes, RoutesRecognized} from '@angular/router';
import {INavTreeEntry} from './INavTreeEntry';
import * as _ from 'lodash';
import {Log} from '../base/lib/log/Log';

function isRedirect(route: Route) {
  return _.has(route, 'redirectTo');
}

/**
 * Navigation service interpreted the router data and generate structured navigation informations.
 */
@Injectable()
export class NavigatorService {

  entries: NavEntry[] = [];

  private router: Router;

  private reload: any = [];


  constructor(@Inject(Router) router: Router) {
    this.router = router;
    this.router.events.subscribe(this.onRouterEvent.bind(this));
    this.rebuild();
  }

  rebuild() {
    Log.debug('rebuild routes');
    this.read(this.router.config);
    const routes = this.rebuildRoutes();

    // const routes2 = this.getRebuildRoutes();
    this.router.resetConfig(routes);
    // this.read(this.router.config);
  }

  /**

   The events occur in the following sequence:

   NavigationStart: Navigation starts.
   RouteConfigLoadStart: Before the router lazy loads a route configuration.
   RouteConfigLoadEnd: After a route has been lazy loaded.
   RoutesRecognized: When the router parses the URL and the routes are recognized.
   GuardsCheckStart: When the router begins the guards phase of routing.
   ChildActivationStart: When the router begins activating a route's children.
   ActivationStart: When the router begins activating a route.
   GuardsCheckEnd: When the router finishes the guards phase of routing successfully.
   ResolveStart: When the router begins the resolve phase of routing.
   ResolveEnd: When the router finishes the resolve phase of routing successfuly.
   ChildActivationEnd: When the router finishes activating a route's children.
   ActivationEnd: When the router finishes activating a route.
   NavigationEnd: When navigation ends successfully.
   NavigationCancel: When navigation is canceled.
   NavigationError: When navigation fails due to an unexpected error.
   Scroll: When the user scrolls.

   * @param event
   */
  onRouterEvent(event: any) {
    if (event instanceof RouteConfigLoadEnd) {
      const entry = this.router.config.find(x => x.path === event.route['path']);
      if (entry && !_.has(entry, '_loadedConfig')) {
        this.reload = true;
      }
    } else if (event instanceof RoutesRecognized && this.reload) {
      this.reload = false;
      this.rebuild();
    }
  }


  readRoutes(config: Routes, parent: NavEntry = null) {
    for (const route of config) {

      let entry = _.find(this.entries, e => !e.isGroup() && e.id === route['navId']);
      if (!entry) {
        const _isRedirect = isRedirect(route);
        if (!_isRedirect) {
          const entryWithPath = _.find(this.entries, e => !e.isGroup() && e.route.path === route.path);
          if (!entryWithPath) {
            entry = new NavEntry();
            this.entries.push(entry);
            entry.parse(route);
          } else {
            entry = entryWithPath;
            entry.merge(route);
          }
        } else {
          entry = new NavEntry();
          this.entries.push(entry);
          entry.parse(route);
        }
      }

      if (parent && parent !== entry) {
        entry.setParent(parent);
      }

      if (route.children && !_.isEmpty(route.children)) {
        this.readRoutes(route.children, entry);
      } else if (route.loadChildren && _.has(route, '_loadedConfig.routes')) {
        const routes = _.get(route, '_loadedConfig.routes', []);
        if (!_.isEmpty(routes)) {
          this.readRoutes(routes, entry);
        }
      }
    }
  }


  read(routes: Routes) {
    this.readRoutes(routes);

    for (const entry of this.entries) {
      const realPath = entry.getFullPath();
      if (_.isEmpty(realPath) || entry.isRedirect()) {
        continue;
      }
      const parentEntry = this.findMatch(realPath);
      if (parentEntry && parentEntry !== entry) {
        entry.setParent(parentEntry);
      }
    }

    // apply groups
    _.filter(this.entries, entry => entry.isGroup()).map(groupEntry => {
      this.regroup(groupEntry);
    });
  }


  private rebuildRoutes(parent: NavEntry = null): Routes {
    const navEntries: NavEntry[] = _.filter(this.entries, e => e.parent === parent);
    const routes: Routes = [];
    while (navEntries.length > 0) {
      const navEntry = navEntries.shift();
      const r = navEntry.route;
      // if route exists
      if (r && !navEntry.isGroup()) {
        r.path = navEntry.path;
        if (!navEntry.isRedirect() && !navEntry.isLazyLoading()) {
          r.children = this.rebuildRoutes(navEntry);
        }
        routes.push(r);
      } else {
        const children = _.filter(this.entries, e => e.parent === navEntry);
        children.forEach(c => navEntries.push(c));
      }
    }
    return routes;
  }


  getRoots() {
    return _.filter(this.entries, e => e.parent === null);
  }


  getEntry(path: string) {
    return _.find(this.entries, e => e.getFullPath() === path);
  }


  getEntryByContext(path: string) {
    return _.find(this.entries, e => _.get(e, 'data.context', null) === path);
  }


  getEntryBy(path: string, cb: Function) {
    return _.find(this.entries, cb);
  }


  addGroupEntry(pattern: string, data: any) {
    const navEntry = new NavEntry();
    navEntry.asGroup(pattern, data);
    this.entries.push(navEntry);
    this.regroup(navEntry);
    return navEntry;
  }


  regroup(groupEntry: NavEntry) {
    const pattern = groupEntry.groupRegex;
    const base = this.findMatch(pattern);

    if (base) {
      groupEntry.setParent(base);
    }

    const regex = new RegExp(pattern);
    const entries = _.orderBy(this.entries, s => {
      return s.getFullPath().length;
    });

    const selected: number[] = [];
    const children = _.filter(entries, e => {
      const id = e.getParentId();
      if (id && selected.indexOf(id) !== -1) {
        return false;
      }
      const fullPath = e.getFullPath();
      const res = !e.isGroup() && regex.test(fullPath);
      if (res) {
        selected.push(e.id);
      }
      return res;
    });
    _.map(children, c => c.setParent(groupEntry));
  }


  getTree(from: string | NavEntry = null, filter?: (entry: NavEntry) => boolean): INavTreeEntry[] {
    const fromEntry = !_.isNull(from) ? (from instanceof NavEntry ? from : this.getEntry(from)) : null;
    const _routes: NavEntry[] = _.filter(this.entries,
      e => e.parent === fromEntry && (filter ? filter(e) : true) && !e.isRedirect() && !e.toIgnore());
    const routes = _.map(_routes, route => {
      const r: INavTreeEntry = {
        label: route.label,
        isGroup: false,
        entry: route
      };
      if (!route.isGroup()) {
        r.path = route.getFullPath();
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
    const split = path.split('/');
    let base = null;
    while (split.length > 0 && !base) {
      split.pop();
      const lookup = split.join('/');
      base = _.find(this.entries, e =>
        !e.isGroup() &&
        e.getFullPath() === lookup &&
        !e.isRedirect() &&
        !e.toIgnore()
      );
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
