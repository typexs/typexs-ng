import {XSRegistry} from '../XSRegistry';


export function XsEntity() {
  return function (object: Function) {

    let xsDef = XSRegistry.createEntity(object);
    XSRegistry.register(xsDef);

  };
}

