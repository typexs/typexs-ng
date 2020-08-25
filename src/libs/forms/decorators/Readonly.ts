import {AnnotationsHelper} from 'commons-schema-api/browser';

export function Readonly() {
  return function (object: any, property: string) {
    AnnotationsHelper.forPropertyOn(object.constructor, property, {form: 'readonly'});
  };
}
