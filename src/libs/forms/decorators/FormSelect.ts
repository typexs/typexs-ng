import {AnnotationsHelper} from 'commons-schema-api/browser';
import {ClassRef} from 'commons-schema-api/browser';
import {ISelectOptions} from '../elements/ISelectOptions';

export function FormSelect(options: ISelectOptions) {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
    AnnotationsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'select', select: options, enum: options.enum});
  };
}
