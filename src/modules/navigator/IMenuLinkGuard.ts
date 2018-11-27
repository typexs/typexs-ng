import {NavEntry} from './NavEntry';

export interface IMenuLinkGuard {

  isDisabled?(entry: NavEntry): boolean;

  isHidden?(entry: NavEntry): boolean;
}
