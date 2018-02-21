import {Component} from '@angular/core';
import {Router} from "@angular/router";

import {NavEntry} from "./NavEntry";

@Component({
  selector: 'nav-root',
  templateUrl: './navigator.component.html',
})
export class NavigatorComponent {

  routes: NavEntry[] = []

  constructor(router: Router) {

    for (let route of router.config) {
      let entry = new NavEntry();
      entry.label = route.data.label;
      entry.path = route.path;
      this.routes.push(entry);
    }
    console.log(this.routes)
  }
}
