import * as _ from 'lodash';
import {Component} from '@angular/core';
import {IGridColumn} from '../../../../base/datatable/IGridColumn';
import {SimpleHtmlTableComponent} from '../../../../base/datatable/simple-html-table/simple-html-table.component';
import {IDTGridOptions} from '../../../../base/datatable/IDTGridOptions';
import {IGridApi} from '../../../../base/datatable/IGridApi';
import {And, ExprDesc} from 'commons-expressions';


@Component({
  selector: 'simple-html-table-demo',
  templateUrl: 'simple-html-table-demo.component.html',
})
export class SimpleHtmlTableDemoComponent {

  simpleTableComp = SimpleHtmlTableComponent;


  maxRows: number;


  options: IDTGridOptions = {
    pagerId: 'page',
    limit: 25,
    enablePager: true
  };

  columns: IGridColumn[] = [
    {label: 'Id', field: 'id', filter: true, sorting: true, filterDataType: 'number'},
    {label: 'Name', field: 'name'},
  ];


  rows = [
    {
      id: 1,
      name: 'First'
    },
    {
      id: 2,
      name: 'Second'
    }
  ];


  update(key: string, v: any): void {
    if (key === 'maxRows') {

    }

  }

  generateData(offset: number, limit: number) {
    return _.range(offset, offset + limit).map(x => {
      return {
        id: x,
        name: 'Entry ' + x
      };
    });
  }

  doQuery(api: IGridApi): void {
    let generated = this.generateData(api.params.offset, api.params.limit);

    if (api.params.filters) {
      const keys = _.keys(api.params.filters);
      let filter: ExprDesc = null;
      if (keys.length > 1) {
        filter = And(...keys.map(x => api.params.filters[x]));
      } else {
        filter = api.params.filters[keys.shift()];
      }
      const _filter = filter.lookup({});
      generated = generated.filter(v => _filter(v));
    }

    api.setRows(generated);
  }
}
