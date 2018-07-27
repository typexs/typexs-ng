import {ContentComponentRegistry} from '../ContentComponentRegistry';


export function ViewComponent(typeName: string) {
  return function (object: Function) {
    ContentComponentRegistry.addComponent(typeName, object);
  };
}
