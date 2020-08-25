import {AnnotationsHelper} from 'commons-schema-api/browser';

export function Type(options: { form: string, [k: string]: any }) {
  return function (object: any, property: string) {
    const opts: any = {form: options.form};
    opts[options.form] = options;
    delete opts[options.form]['form'];
    AnnotationsHelper.forPropertyOn(object.constructor, property, opts);
  };
}
