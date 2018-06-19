import * as _ from 'lodash';
import {IXsPropertyDef, XSRegistry} from '../XSRegistry';

export function XsProperty(typeOrOptions: IXsPropertyDef | string = null) {
  return function (object: any, property: string, _options: any = {}) {
    let options:IXsPropertyDef = {};

    if (_.isString(typeOrOptions === "string")) {
      options.type = <string>typeOrOptions;
    }
    else  {
      options = <IXsPropertyDef>typeOrOptions;
    }

    let xsDef = XSRegistry.createProperty(object, property, options);
    XSRegistry.register(xsDef);
  };
}
