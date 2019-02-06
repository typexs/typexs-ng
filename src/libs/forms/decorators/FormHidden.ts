import {AnnotationsHelper} from 'commons-schema-api/browser';
import {ClassRef} from 'commons-schema-api/browser';
import {ISelectOptions} from '../elements/ISelectOptions';

export function FormHidden() {
  return function (object: any, property: string) {
    AnnotationsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'hidden'});
  };
}
