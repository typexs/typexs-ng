import {ChangeDetectorRef, Component} from '@angular/core';
import {EntityService} from './../../entity.service';
import {ActivatedRoute} from '@angular/router';
import {EntityQueryEmbeddedComponent} from './../embedded/entity-query-embedded.component';
import {IGridColumn} from '../../../base/datatable/IGridColumn';
import {CC_GRID_CELL_ENTITY_OPERATIONS} from '../../../base/constants';


@Component({
  selector: 'txs-entity-query',
  templateUrl: './entity-query.component.html',
  styleUrls: ['./entity-query.component.scss']
})
export class EntityQueryComponent extends EntityQueryEmbeddedComponent {


  constructor(private entityService2: EntityService,
              private route: ActivatedRoute) {
    super(entityService2);
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
