import {IGridOptions} from '../elements/IGridOptions';
import {OptionsHelper} from '@typexs/schema/libs/registry/OptionsHelper';
import {ClassRef} from '@typexs/schema/libs/registry/ClassRef';

export function FormGrid(options: IGridOptions) {
  return function (object: any, property: string) {
    OptionsHelper.forPropertyOn(ClassRef.get(object), property, {form: 'grid', grid: options});
  };
}
