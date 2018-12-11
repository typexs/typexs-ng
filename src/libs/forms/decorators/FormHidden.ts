import {OptionsHelper} from '@typexs/schema/libs/registry/OptionsHelper';
import {ClassRef} from '@typexs/schema/libs/registry/ClassRef';
import {ISelectOptions} from '../elements/ISelectOptions';

export function FormHidden() {
  return function (object: any, property: string) {
    OptionsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'hidden'});
  };
}
