import {AnnotationsHelper} from 'commons-schema-api/browser';
import {ISelectOptions} from '../elements/ISelectOptions';

export function FormSelect(options: ISelectOptions) {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
    AnnotationsHelper.forPropertyOn(object.constructor, property, {form: 'select', select: options, enum: options.enum});
  };
}
