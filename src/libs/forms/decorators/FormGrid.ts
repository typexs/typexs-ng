import {IGridOptions} from '../elements/IGridOptions';
import {AnnotationsHelper} from 'commons-schema-api/browser';

export function FormGrid(options: IGridOptions = {}) {
  return function (object: any, property: string) {
    AnnotationsHelper.forPropertyOn(object.constructor, property, {form: 'grid', grid: options});
  };
}
