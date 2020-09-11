import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DistributedStorageQueryEmbeddedComponent} from '../embedded/query-embedded.component';
import {DistributedStorageService} from '../../../services/distributed_storage.service';


@Component({
  selector: 'txs-distributed-storage-query',
  templateUrl: './query-page.component.html',
  styleUrls: ['./query-page.component.scss']
})
export class DistributedStorageQueryPageComponent
  extends DistributedStorageQueryEmbeddedComponent {


  constructor(public _storageService: DistributedStorageService,
              private route: ActivatedRoute) {
    super(_storageService);
  }

  ngOnInit() {
    // this.options.columnsPostProcess = this.columnsPostProcess.bind(this);
    super.ngOnInit();
  }

  //
  // columnsPostProcess(columns: IGridColumn[]) {
  //   columns.unshift(<IGridColumn & { urlPrefix: string }>{
  //     label: 'Ops',
  //     field: null,
  //     sorting: false,
  //     filter: false,
  //     entityRef: this.entityRef,
  //     urlPrefix: this.getQueryService().getNgUrlPrefix(),
  //     cellValueRenderer: CC_GRID_CELL_ENTITY_OPERATIONS
  //   });
  // }
  //
  // findEntityDef() {
  //   this.machineName = this.route.snapshot.paramMap.get('machineName');
  //   super.findEntityDef();
  // }

}
