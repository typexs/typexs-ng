import {XsRegistry} from '../XsRegistry';


export function Entity() {
  return function (object: Function) {

    let xsDef = XsRegistry.createEntity(object);
    XsRegistry.register(xsDef);

  };
}

