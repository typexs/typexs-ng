
import * as _ from '../../LoDash';
import {IResolver} from '../IResolver';
import {FormObject} from '../FormObject';
import {ResolveDataValue} from '../ResolveDataValue';
import {Ref} from './Ref';
import {FormPart} from '../decorators/FormPart';


@FormPart('form')
export class Form extends FormObject {

  dataContainer: any;

  resolver: IResolver[] = [];

  combine(otherForm: Form) {
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
