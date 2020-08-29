import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../storage.service';
import {StorageAggregateEmbeddedComponent} from '../embedded/storage-aggregate-embedded.component';
import {IGridColumn} from '../../../base/datatable/IGridColumn';
import {CC_GRID_CELL_ENTITY_OPERATIONS} from '../../../base/constants';


@Component({
  selector: 'txs-storage-aggregate',
  templateUrl: './storage-aggregate.component.html',
  styleUrls: ['./storage-aggregate.component.scss']
})
export class StorageAggregateComponent extends StorageAggregateEmbeddedComponent {


  constructor(public _storageService: StorageService,
              private route: ActivatedRoute) {
    super(_storageService);
  }

  ngOnInit() {
    this.options.columnsPostProcess = this.columnsPostProcess.bind(this);
    super.ngOnInit();
  }

  columnsPostProcess(columns: IGridColumn[]) {
    columns.unshift(<IGridColumn & { urlPrefix: string }>{
      label: 'Ops',
      field: null,
      sorting: false,
      filter: false,
      entityRef: this.entityRef,
      urlPrefix: this.getQueryService().getNgUrlPrefix(),
      cellValueRenderer: CC_GRID_CELL_ENTITY_OPERATIONS
    });
  }

  findEntityDef() {
    this.machineName = this.route.snapshot.paramMap.get('machineName');
    super.findEntityDef();
  }

}
