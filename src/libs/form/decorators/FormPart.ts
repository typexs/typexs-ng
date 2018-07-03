import {FormRegistry} from '../FormRegistry';

export function FormPart(typeName: string) {
  return function (object: Function) {
    FormRegistry.addHandler(typeName, object);
  };
}
