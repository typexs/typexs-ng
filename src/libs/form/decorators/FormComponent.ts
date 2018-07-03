import {FormRegistry} from '../FormRegistry';

export function FormComponent(typeName: string) {
  return function (object: Function) {
    FormRegistry.addComponent(typeName, object);
  };
}
