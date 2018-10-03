import {Inject, Injectable} from '@angular/core';
import {NavEntry} from './NavEntry';
import {Router, Routes} from '@angular/router';
import _ = require('lodash');


@Injectable()
export class NavigatorService {

  cache: any = {};

  entries: NavEntry[] = [];

  private router: Router;

  constructor(@Inject(Router) router: Router) {
    this.router = router;
    this.router.events.subscribe(this.onRouterEvent.bind(this));
    this.entries = [];
    this.build(this.router.config);
  }

  onRouterEvent(event: any) {
    // TODO
  }

  build(config: Routes, parent: NavEntry = null) {

    for (let route of config) {
      let entry = new NavEntry();
      entry.parse(route, parent);
      this.entries.push(entry);
      if (route.children && !_.isEmpty(route.children)) {
        this.build(route.children, parent);
      }
    }

    // TODO if auto build tree


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
