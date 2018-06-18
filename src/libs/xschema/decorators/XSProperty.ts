import {XSRegistry} from '../XSRegistry';

export function XSProperty(opts: any = {}) {
  return function (object: any, property: string, options: any = {}) {
    let xsDef = XSRegistry.createProperty(object, property);
    xsDef.options(opts);
    XSRegistry.register(xsDef);
  };
}
