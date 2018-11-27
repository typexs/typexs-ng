import {NavEntry} from './NavEntry';

export interface IMenuLinkGuard {

  isDisabled?(entry: NavEntry): Promise<boolean> | boolean;

  isHidden?(entry: NavEntry): Promise<boolean> | boolean;
}
