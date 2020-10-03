import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../storage.service';
import {StorageQueryEmbeddedComponent} from './../embedded/storage-query-embedded.component';
import {IGridColumn} from '../../../base/datatable/IGridColumn';
import {CC_GRID_CELL_ENTITY_OPERATIONS} from '../../../base/constants';


@Component({
  selector: 'txs-storage-query',
  templateUrl: './storage-query.component.html',
  styleUrls: ['./storage-query.component.scss']
})
export class StorageQueryComponent extends StorageQueryEmbeddedComponent {


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
    this.name = this.route.snapshot.paramMap.get('name');
    super.findEntityDef();
  }

}
