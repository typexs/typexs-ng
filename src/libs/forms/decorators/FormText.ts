import {AnnotationsHelper, ClassRef} from 'commons-schema-api/browser';

export function FormText() {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
    AnnotationsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'text'});
  };
}
