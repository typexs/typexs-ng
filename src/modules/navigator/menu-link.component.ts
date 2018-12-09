import * as _ from 'lodash';
import {Component, Injector, Input, OnInit} from '@angular/core';
import {INavTreeEntry} from './INavTreeEntry';
import {IMenuLinkGuard} from './IMenuLinkGuard';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss']
})
export class MenuLinkComponent implements OnInit {

  @Input()
  entry: INavTreeEntry;

  activators: IMenuLinkGuard[] = null;

  isDisabled: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isShown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private injector: Injector) {
  }


  ngOnInit(): void {
    let activators = this.getActivator();
    if (!_.isEmpty(activators)) {

      for (let canAct of activators) {

        if (canAct.isDisabled) {
          (<IMenuLinkGuard>canAct).isDisabled(this.entry.entry).subscribe(this.isDisabled) ;
        }
        if (canAct.isShown) {
          (<IMenuLinkGuard>canAct).isShown(this.entry.entry).subscribe(this.isShown);
        }
      }
    }
  }


  hasChildren() {
    return this.entry.children && this.entry.children.length > 0;
  }


  private getActivator() {
    if (this.activators) return this.activators;
    this.activators = [];
    let canActivate = _.get(this.entry, 'entry.route.canActivate', false);
    if (canActivate && _.isArray(canActivate)) {
      for (let canAct of canActivate) {
        let guard = this.injector.get(canAct);
        if (guard.isDisabled || guard.isHidden) {
          this.activators.push(guard);
        }
      }
    }
    return this.activators;
  }

  /*
    isDisabled():Observable<boolean> | boolean {
      let disable: boolean = false;
      let activators = this.getActivator();
      if (!_.isEmpty(activators)) {
        for (let canAct of activators) {
          if (canAct.isDisabled) {
            return (<IMenuLinkGuard>canAct).isDisabled(this.entry.entry);
          }
        }
      }
      return disable;
    }


    isHidden():Observable<boolean> | boolean {
      let disable: boolean = false;
      let activators = this.getActivator();
      if (!_.isEmpty(activators)) {
        for (let canAct of activators) {
          if (canAct.isHidden) {
            return  (<IMenuLinkGuard>canAct).isHidden(this.entry.entry);
          }
        }
      }
      return disable;
    }
  */
}
