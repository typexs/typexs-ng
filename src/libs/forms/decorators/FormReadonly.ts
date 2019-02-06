import {AnnotationsHelper, ClassRef} from 'commons-schema-api/browser';

export function FormReadonly() {
  return function (object: any, property: string) {
    AnnotationsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'readonly'});
  };
}
