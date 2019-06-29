import * as _ from 'lodash';
import {Component} from '@angular/core';
import {IGridColumn} from '../../../../system/datatable/IGridColumn';
import {SimpleHtmlTableComponent} from '../../../../system/datatable/simple-html-table/simple-html-table.component';
import {IGridOptions} from '../../../../system/datatable/IGridOptions';
import {IGridApi} from '../../../../system/datatable/IGridApi';
import {And, ExprDesc} from 'commons-expressions';


@Component({
  selector: 'simple-html-table-demo',
  templateUrl: 'simple-html-table-demo.component.html',
})
export class SimpleHtmlTableDemoComponent {

  simpleTableComp = SimpleHtmlTableComponent;


  maxRows: number;


  options: IGridOptions = {
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
    console.log(key, v);
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
    console.log('doQuery', api.params);
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
      console.log(generated, _filter);

      generated = generated.filter(v => _filter(v));
    }

    api.setRows(generated);
  }
}