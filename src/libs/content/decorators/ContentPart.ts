import {ContentComponentRegistry} from '../ContentComponentRegistry';


export function ContentPart(typeName: string) {
  return function (object: Function) {
    ContentComponentRegistry.addHandler(typeName, object);
  };
}
