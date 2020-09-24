import * as _ from 'lodash';
import {Component, Injector, Input, OnInit} from '@angular/core';
import {INavTreeEntry} from './INavTreeEntry';
import {IMenuLinkGuard} from './IMenuLinkGuard';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


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
    const activators = this.getActivator();
    if (!_.isEmpty(activators)) {

      for (const canAct of activators) {

        if (canAct.isDisabled) {
          (<IMenuLinkGuard>canAct).isDisabled(this.entry.entry)
            .subscribe(
              x => this.isDisabled.next(x), err => this.isDisabled.error(err), () => this.isDisabled.complete()
            );
        }
        if (canAct.isShown) {
          (<IMenuLinkGuard>canAct).isShown(this.entry.entry)
            .subscribe(
              x => this.isShown.next(x), err => this.isShown.error(err), () => this.isShown.complete()
            );
        }
      }
    }
  }

  isCaption() {
    return this.entry.isGroup;
  }

  hasChildren() {
    return this.entry.children && this.entry.children.length > 0;
  }


  private getActivator() {
    if (this.activators) {
      return this.activators;
    }
    this.activators = [];
    const canActivate = _.get(this.entry, 'entry.route.canActivate', false);
    if (canActivate && _.isArray(canActivate)) {
      for (const canAct of canActivate) {
        const guard = this.injector.get(canAct) as IMenuLinkGuard;
        if (guard.isDisabled || guard.isShown) {
          this.activators.push(guard);
        }
      }
    }
    return this.activators;
  }


  icon() {
    const icon = _.get(this.entry, 'entry.data.icon', null);
    if (icon) {
      return icon;
    }
    if (this.entry.isGroup) {
      return 'icon-' + this.entry.entry.groupRegex.replace(/[^\w\d]/g, '-').replace(/-+$/, '');
    } else {
      return 'icon-' + this.entry.path.replace(/[^\w\d]/g, '-');
    }

  }
}
