import {Component, Input, OnInit} from '@angular/core';
import {NavigatorService} from './navigator.service';
import {INavTreeEntry} from './INavTreeEntry';
import {NavEntry} from './NavEntry';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input()
  label: string = null;

  @Input()
  base: string = null;

  @Input()
  group: string = null;

  tree: INavTreeEntry[] = [];

  constructor(private navigator: NavigatorService) {
  }

  ngOnInit() {
    this.tree = this.navigator.getTree(this.base, (e: NavEntry) => {
      if (this.group) {
        return e.group == this.group;
      }
      return true;
    });
  }

  /*
  entries() {
    let entries = this.navigator.getEntries();
    console.log(entries);
    if (this.group) {
      entries = this.navigator.getEntriesByGroup(this.group);
    }

    if (this.regex) {
      const regex = new RegExp(this.regex);
      entries = _.filter(entries,e => regex.test(e.path));
    }

    entries = _.clone(entries);
    if(this.outlet){
      // override outlet
      entries.map(e => {e.outlet = this.outlet});
    }

    console.log(entries);
    return entries;
  }
*/

}
