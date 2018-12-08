import {NavEntry} from './NavEntry';
import {Observable} from 'rxjs/Observable';

export interface IMenuLinkGuard {
  /*
    isDisabled?(entry: NavEntry): Observable<boolean> | Promise<boolean> | boolean;

    isHidden?(entry: NavEntry): Observable<boolean> | Promise<boolean> | boolean;
    */
  isDisabled?(entry: NavEntry): Observable<boolean>;

  isHidden?(entry: NavEntry): Observable<boolean>;
}
