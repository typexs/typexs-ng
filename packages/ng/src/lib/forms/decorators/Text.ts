import {AnnotationsHelper} from '@allgemein/schema-api';

export function Text() {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
    AnnotationsHelper.forPropertyOn(object.constructor, property, {form: 'text'});
  };
}
