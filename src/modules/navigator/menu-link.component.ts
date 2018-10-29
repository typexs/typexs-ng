import {Component, Input, OnInit} from '@angular/core';
import {INavTreeEntry} from './INavTreeEntry';

@Component({
  selector: 'menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss']
})
export class MenuLinkComponent  {

  @Input()
  entry: INavTreeEntry;

  hasChildren(){
    return this.entry.children && this.entry.children.length > 0
  }

}
