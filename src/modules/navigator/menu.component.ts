import {Component, Input} from '@angular/core';
import {NavigatorService} from './navigator.service';
import _ = require('lodash');

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input()
  label: string = null;

  @Input()
  group: string = null;

  @Input()
  regex: string = null;

  @Input()
  outlet: string = null;

  constructor(private navigator: NavigatorService) {
  }


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


}
