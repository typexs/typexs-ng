import {ContentComponentRegistry} from '../ContentComponentRegistry';


export function ViewContent(typeName: string) {
  return function (object: Function) {
    ContentComponentRegistry.addHandler(typeName, object);
  };
}
