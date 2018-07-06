import {FormRegistry} from '../FormRegistry';

export function FormComp(typeName: string) {
  return function (object: Function) {
    FormRegistry.addComponent(typeName, object);
  };
}
