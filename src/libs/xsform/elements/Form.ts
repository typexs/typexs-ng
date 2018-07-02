import * as _ from 'lodash';
import {IResolver} from '../IResolver';
import {Element} from '../decorators/Element';
import {FormObject} from '../FormObject';
import {ResolveDataValue} from '../ResolveDataValue';
import {Ref} from './Ref';

@Element('form')
export class Form<T> extends FormObject {

  dataContainer: T;

  resolver: IResolver[] = [];

  combine(otherForm: Form<T>) {
    let resolverCache: IResolver[] = [];

    while (this.resolver.length > 0) {
      let resolver = this.resolver.shift();
      if (resolver instanceof ResolveDataValue) {
        resolver.resolve(otherForm);
      } else {
        resolverCache.push(resolver);
      }
    }

    while (resolverCache.length > 0) {

      let resolver = resolverCache.shift();
      if (resolver instanceof Ref) {
        resolver.resolve(otherForm);
      }
    }

    return this;
  }

  get(path: string) {
    let _path = path.split('.');
    let tmpElem: FormObject = this;
    let element = null;
    while (_path.length > 0) {
      let _p = _path.shift();
      tmpElem = _.find(tmpElem.getChildren(), {name: _p});
      if (!tmpElem) {
        break;
      } else {
        element = tmpElem;
      }
    }
    return _path.length == 0 && element ? element : null;

  }

}
