import {NavEntry} from './NavEntry';
import {Observable} from 'rxjs/Observable';

export interface IMenuLinkGuard {

  isDisabled?(entry: NavEntry): Observable<boolean>;

  isShown?(entry: NavEntry): Observable<boolean>;
}
