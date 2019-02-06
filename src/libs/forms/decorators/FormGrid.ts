import {IGridOptions} from '../elements/IGridOptions';
import {AnnotationsHelper, ClassRef} from 'commons-schema-api/browser';

export function FormGrid(options: IGridOptions = {}) {
  return function (object: any, property: string) {
    AnnotationsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'grid', grid: options});
  };
}
