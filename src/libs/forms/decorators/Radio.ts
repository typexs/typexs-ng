import {AnnotationsHelper} from 'commons-schema-api/browser';

export function Radio() {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
    AnnotationsHelper.forPropertyOn(object.constructor, property, {form: 'radio'});
  };
}