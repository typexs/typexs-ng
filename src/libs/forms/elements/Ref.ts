import {FormObject, isFormObject} from '../FormObject';
import {IResolver} from '../IResolver';
import {Form} from './Form';

import * as _ from 'lodash';
import {ViewContent} from '../../views/decorators/ViewContent';

@ViewContent('ref')
export class Ref extends FormObject implements IResolver {

  use: string;

  postProcess() {
    this.getForm()['resolver'].push(this);
  }

  resolve(form: Form) {
    let elem = form.get(this.use);
    if(isFormObject(elem)){
      let e = _.clone(elem);
      this.replace(e);

      // copy properties
      this.getUsedKeys().forEach(k => {
        e.handle(k, this[k]);
      });

    }

  }
}




