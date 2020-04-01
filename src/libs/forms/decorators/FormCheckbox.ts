
import {ICheckboxOptions} from '../elements/ICheckboxOptions';
import {AnnotationsHelper, ClassRef} from 'commons-schema-api/browser';

export function FormCheckbox(opts?: ICheckboxOptions) {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
   const _opts: any = {form: 'checkbox'};
   if (opts && opts.enum) {
     _opts.enum = opts.enum;
   }

    AnnotationsHelper.forPropertyOn(ClassRef.get(object), property, _opts);
  };
}
