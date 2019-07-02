import {IValueProvider} from '@typexs/base/libs/tasks/decorators/IValueProvider';
import {ExprDesc} from 'commons-expressions/browser';
import {IPropertyRef} from 'commons-schema-api/browser';

export class VProvider implements IValueProvider<string[]> {
  get(entity?: any, property?: IPropertyRef, hint?: ExprDesc): string[] {
    return ['VP-One', 'VP-Two', 'VP-Three'];
  }

}
