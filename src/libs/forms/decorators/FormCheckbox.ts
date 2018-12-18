import {OptionsHelper} from '@typexs/schema/libs/registry/OptionsHelper';
import {ClassRef} from '@typexs/schema/libs/registry/ClassRef';
import {ISelectOptions} from '../elements/ISelectOptions';
import {ICheckboxOptions} from '../elements/ICheckboxOptions';

export function FormCheckbox(opts: ICheckboxOptions = {}) {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
   let _opts:any = {form: 'checkbox'};
   if(opts && opts.enum){
     _opts.enum = opts.enum;
   }

    OptionsHelper.forPropertyOn(ClassRef.get(object), property, _opts);
  };
}
