import {XsRegistry} from '../XsRegistry';


export function XsEntity() {
  return function (object: Function) {

    let xsDef = XsRegistry.createEntity(object);
    XsRegistry.register(xsDef);

  };
}

