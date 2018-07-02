import {FormRegistry} from '../FormRegistry';

export function Element(typeName: string) {
  return function (object: Function) {
    FormRegistry.addHandler(typeName, object);
  };
}
