import {ContentComponentRegistry} from '../ContentComponentRegistry';


export function ContentComponent(typeName: string) {
  return function (object: Function) {
    ContentComponentRegistry.addComponent(typeName, object);
  };
}
