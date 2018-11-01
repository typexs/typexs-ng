import {Component, Input, OnInit} from '@angular/core';
import {NavigatorService} from './navigator.service';
import {INavTreeEntry} from './INavTreeEntry';
import {NavEntry} from './NavEntry';
import * as _ from 'lodash';

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

  @Input()
  level: number = null;

  @Input()
  filter: (e:NavEntry) => boolean = (e: NavEntry) => {
    let ret = true;
    if (!_.isNull(this.group)) {
      ret = ret && e.groups && e.groups.indexOf(this.group) !== -1;
    }

    if (!_.isNull(this.level)) {
      ret = ret && e.getLevel() <= this.level;
    }

    return ret;
  };

  tree: INavTreeEntry[] = [];


  constructor(private navigator: NavigatorService) {}


  ngOnInit() {
    this.tree = this.navigator.getTree(this.base, this.filter.bind(this));
  }

}
