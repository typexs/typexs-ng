import * as _ from 'lodash';
import {Element} from '../decorators/Element';
import {FormObject} from '../FormObject';
import {IResolver} from '../IResolver';
import {Form} from './Form';

@Element('ref')
export class Ref extends FormObject implements IResolver {

  use: string;

  postProcess() {
    this.getForm().resolver.push(this);
  }

  resolve(form: Form<any>) {
    let elem = form.get(this.use);
    let e = _.clone(elem);
    this.replace(e);

    // copy properties
    this.getUsedKeys().forEach(k => {
      e.handle(k, this[k]);
    });

  }
}




