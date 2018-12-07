import {OptionsHelper} from '@typexs/schema/libs/registry/OptionsHelper';
import {ClassRef} from '@typexs/schema/libs/registry/ClassRef';
import {ISelectOptions} from '../elements/ISelectOptions';

export function FormSelect(options: ISelectOptions) {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
    OptionsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'select', select: options, enum: options.enum});
  };
}
