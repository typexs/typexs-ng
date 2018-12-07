import {OptionsHelper} from '@typexs/schema/libs/registry/OptionsHelper';
import {ClassRef} from '@typexs/schema/libs/registry/ClassRef';
import {ISelectOptions} from '../elements/ISelectOptions';

export function FormType(options: { form: string, [k: string]: any }) {
  return function (object: any, property: string) {
    let opts: any = {form: options.form};
    opts[options.form] = options;
    delete opts[options.form]['form'];
    OptionsHelper.forPropertyOn(ClassRef.get(object), property, opts);
  };
}
