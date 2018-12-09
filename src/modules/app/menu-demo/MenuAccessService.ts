import {Injectable} from '@angular/core';
import {IMenuLinkGuard} from '../../navigator/IMenuLinkGuard';
import {NavEntry} from '../../navigator/NavEntry';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MenuAccessService implements IMenuLinkGuard {

  isDisabled(entry: NavEntry): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      subscriber.next(true);
    });
  }

  isShown(entry: NavEntry): Observable<boolean> {
    if (entry.path == 'menu-item-3') {
      return new Observable<boolean>(subscriber => {
        subscriber.next(false);
      });
    }
    return new Observable<boolean>(subscriber => {
      subscriber.next(true);
    });
  }

}
