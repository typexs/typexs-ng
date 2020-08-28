import {AnnotationsHelper} from 'commons-schema-api/browser';

export function Hidden() {
  return function (object: any, property: string) {
    AnnotationsHelper.forPropertyOn(object.constructor, property, {form: 'hidden'});
  };
}