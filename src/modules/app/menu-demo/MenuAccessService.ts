import {Injectable} from '@angular/core';
import {IMenuLinkGuard} from '../../navigator/IMenuLinkGuard';
import {NavEntry} from '../../navigator/NavEntry';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class MenuAccessService implements IMenuLinkGuard {

  entry: { [k: string]: BehaviorSubject<boolean> } = {};

  switch(id: string, type: string = 'disabled') {
    if (this.entry[id + '.' + type]) {
      this.entry[id + '.' + type].next(!this.entry[id + '.' + type].getValue());
    }

  }


  isDisabled(entry: NavEntry): Observable<boolean> {
    this.entry[entry.getPath() + '.disabled'] = new BehaviorSubject(true);
    return this.entry[entry.getPath() + '.disabled'];
  }

  isShown(entry: NavEntry): Observable<boolean> {
    this.entry[entry.getPath() + '.show'] = new BehaviorSubject(true);
    return this.entry[entry.getPath() + '.show'];
  }

}
