import {Component, OnInit} from '@angular/core';
import {IDTGridOptions} from '../../../../base/datatable/IDTGridOptions';
import {ClassType} from 'commons-schema-api/browser';
import {AbstractGridComponent} from '../../../../base/datatable/abstract-grid.component';
import {IComponentBinding} from '../../../../../libs/views/IComponentBinding';
import {ActivatedRoute} from '@angular/router';
import {ComponentRegistryService} from '../../../../base/component/component-registry.service';
import * as _ from 'lodash';
import {IGridColumn} from '../../../../base/datatable/IGridColumn';
import {IQueryComponentApi} from '../../../../base/api/querying/IQueryComponentApi';
import {CC_GRID_CELL_ENTITY_OPERATIONS} from '../../../../base/constants';
import {IDSOptions} from '../../../lib/IDSOptions';


@Component({
  selector: 'txs-distributed-storage-query',
  templateUrl: './query-page.component.html',
  styleUrls: ['./query-page.component.scss']
})
export class DistributedStorageQueryPageComponent
  implements OnInit {

  options: IDSOptions = {
    entityTypeSelection: true
  };

  gridComponentClass: ClassType<AbstractGridComponent>;

  viewTypes: IComponentBinding[];

  constructor(
    private route: ActivatedRoute,
    private componentRegistry: ComponentRegistryService
  ) {
  }


  ngOnInit() {
    this.viewTypes = this.componentRegistry.registry.filter(x => _.get(x, 'extra.datatable', false));
    const defaultComponent = this.viewTypes.find(x => _.get(x, 'extra.default', false));
    if (defaultComponent) {
      this.gridComponentClass = defaultComponent.component as ClassType<AbstractGridComponent>;
    }
    this.options.columnsPostProcess = this.columnsPostProcess.bind(this);
  }

  switchLayout(viewType: IComponentBinding) {
    if (viewType) {
      this.gridComponentClass = viewType.component as ClassType<AbstractGridComponent>;
    }

  }

  columnsPostProcess(columns: IGridColumn[], api: IQueryComponentApi) {
    if (_.isArray(columns) && api) {
      columns.unshift(<IGridColumn & { urlPrefix: string }>{
        label: 'Ops',
        field: null,
        sorting: false,
        filter: false,
        entityRef: api.getEntityRef(),
        urlPrefix: api.getQueryService().getNgUrlPrefix(),
        cellValueRenderer: CC_GRID_CELL_ENTITY_OPERATIONS
      });
    }
  }

}
