import {OptionsHelper} from '@typexs/schema/libs/registry/OptionsHelper';

import {ISelectOptions} from '../elements/ISelectOptions';
import {ClassRef} from 'commons-schema-api/browser';

export function FormRadio() {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
    OptionsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'radio'});
  };
}
