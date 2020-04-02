import {AnnotationsHelper} from 'commons-schema-api/browser';

export function FormHidden() {
  return function (object: any, property: string) {
    AnnotationsHelper.forPropertyOn(object.constructor, property, {form: 'hidden'});
  };
}
