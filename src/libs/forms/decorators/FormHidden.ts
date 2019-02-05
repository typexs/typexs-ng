import {OptionsHelper} from '@typexs/schema/libs/registry/OptionsHelper';
import {ClassRef} from 'commons-schema-api/browser';
import {ISelectOptions} from '../elements/ISelectOptions';

export function FormHidden() {
  return function (object: any, property: string) {
    OptionsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'hidden'});
  };
}
