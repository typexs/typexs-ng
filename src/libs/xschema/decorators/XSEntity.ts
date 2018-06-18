import {XSRegistry} from '../XSRegistry';


export function XSEntity() {
  return function (object: Function) {

    let xsDef = XSRegistry.createEntity(object);
    XSRegistry.register(xsDef);

  };
}

