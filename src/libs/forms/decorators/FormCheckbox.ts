import {OptionsHelper} from '@typexs/schema/libs/registry/OptionsHelper';
import {ClassRef} from '@typexs/schema/libs/registry/ClassRef';
import {ISelectOptions} from '../elements/ISelectOptions';

export function FormCheckbox() {
  return function (object: any, property: string) {
    // use enum attribute, but later it will be deprecated
    OptionsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'checkbox'});
  };
}
