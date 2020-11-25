import * as _ from 'lodash';
import {IGridColumn} from '../../datatable/IGridColumn';

export class Helper {
  static rebuildColumns(data: any[]) {
    const first = _.first(data);
    const columns = [];
    for (const k of _.keys(first)) {
      const column: IGridColumn = {
        label: k,
        field: k,
        sorting: true
      };
      columns.push(column);
    }
    return columns;
  }
}
