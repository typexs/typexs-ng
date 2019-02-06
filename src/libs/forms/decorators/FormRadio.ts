import {AnnotationsHelper} from 'commons-schema-api/browser';

import {ISelectOptions} from '../elements/ISelectOptions';
import {ClassRef} from 'commons-schema-api/browser';

export function FormRadio() {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
    AnnotationsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'radio'});
  };
}
