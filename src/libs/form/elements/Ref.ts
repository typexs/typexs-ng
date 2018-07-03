import * as _ from 'lodash';

import {FormObject} from '../FormObject';
import {IResolver} from '../IResolver';
import {Form} from './Form';
import {FormPart} from '../decorators/FormPart';

@FormPart('ref')
export class Ref extends FormObject implements IResolver {

  use: string;

  postProcess() {
    this.getForm()['resolver'].push(this);
  }

  resolve(form: Form) {
    let elem = form.get(this.use);
    let e = _.clone(elem);
    this.replace(e);

    // copy properties
    this.getUsedKeys().forEach(k => {
      e.handle(k, this[k]);
    });

  }
}




