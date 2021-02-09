import {Component} from '@angular/core';
import {StorageService} from '../../storage.service';
import {AbstractAggregateEmbeddedComponent} from '../../../base/api/querying/abstract-aggregate-embedded.component';
import {IGridColumn} from '../../../base/datatable/IGridColumn';
import {CC_GRID_CELL_ENTITY_OPERATIONS} from '../../../base/constants';
import {ActivatedRoute} from '@angular/router';


/**
 * Storage query embedded component
 *
 * Possibilities:
 * - sorting
 * - filters
 * - extend/add specialized columns
 */
@Component({
  selector: 'txs-storage-aggregate-embedded',
  templateUrl: './storage-aggregate-embedded.component.html',
  styleUrls: ['./storage-aggregate-embedded.component.scss']
})
export class StorageAggregateEmbeddedComponent extends AbstractAggregateEmbeddedComponent {

  constructor(private storageService: StorageService,
              private route: ActivatedRoute) {
    super();
    this.setQueryService(storageService);
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
