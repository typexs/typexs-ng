import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {IMenuLinkGuard} from '../../navigator/IMenuLinkGuard';
import {NavEntry} from '../../navigator/NavEntry';
import {Observable, BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class MenuAccessService implements IMenuLinkGuard {

  entry: { [k: string]: BehaviorSubject<boolean> } = {};

  change: Subject<boolean> = new Subject();

  switch(id: string, type: string = 'disabled') {

    if (this.entry[id + '.' + type]) {
      this.entry[id + '.' + type].next(!this.entry[id + '.' + type].getValue());
    }

  }

  has(k: string) {
    return _.has(this.entry, k);
  }


  isDisabled(entry: NavEntry): Observable<boolean> {
    const key = (entry.isGroup() ? _.snakeCase(entry.groupRegex) : entry.getPath()) + '.disabled';
    if (!this.entry[key]) {
      this.entry[key] = new BehaviorSubject(true);
      this.change.next(true);
    }
    return this.entry[key];
  }

  isShown(entry: NavEntry): Observable<boolean> {
    const key = (entry.isGroup() ? _.snakeCase(entry.groupRegex) : entry.getPath()) + '.show';
    if (!this.entry[key]) {
      this.entry[key] = new BehaviorSubject(true);
      this.change.next(true);
    }
    return this.entry[key];
  }

}
