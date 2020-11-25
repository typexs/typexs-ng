import * as _ from 'lodash';
import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IQueryParams} from '../../../../base/datatable/IQueryParams';
import {Like, Value} from 'commons-expressions/browser';
import {IDSOptions} from '../../../../distributed_storage/lib/IDSOptions';
import {DistributedStorageQueryEmbeddedComponent} from '../../../../distributed_storage/components/query/embedded/query-embedded.component';
import {DistributedStorageService} from '../../../../distributed_storage/services/distributed_storage.service';


export class C {
  sort: string = null;
  sortDir: string = null;
  filterKey: string = null;
  filterValue: string = null;

}

/**
 * TODO:
 * - default options for grid
 *
 */
@Component({
  selector: 'embedded-distributed-storage',
  templateUrl: 'embedded-distributed-storage.component.html',
})
export class EmbeddedDistributedStorageComponent implements OnInit, OnChanges, AfterViewInit {

  simpleItemName = 'SimpleItem';

  simpleItemOptions: IDSOptions = {
    limit: 10,
    enablePager: true,
    freeQueryBuilder: false,
    pagerId: 'page'
  };

  simpleItemParams: IQueryParams = {};

  @ViewChild('simpleItem01', {static: true})
  simpleItemQuery: DistributedStorageQueryEmbeddedComponent;

  simpleQueryModul = new C();

  _columns: any[] = [];

  constructor(private service: DistributedStorageService) {

  }


  ngOnInit(): void {
    this.simpleItemQuery.datatable.gridReady.subscribe((x: any) => {
      this._columns = this.simpleItemQuery.datatable.api().getColumns();
    });
  }

  ngAfterViewInit() {
    this.service.isLoaded().subscribe(x => {
      this.simpleItemQuery.requery();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  setFilterText() {
    const p = this.simpleItemParams;
    _.set(p, 'filters.text', Like('text', Value('Text 5*')));
    this.simpleItemParams = p;
    this.simpleItemQuery.requery();

  }

  setSortText() {
    const p = this.simpleItemParams;
    _.set(p, 'filters.text', Like('text', Value('Text 5*')));
    this.simpleItemParams = p;
    this.simpleItemQuery.requery();

  }

  doSubmit() {
    const p = this.simpleItemParams;
    if (!_.isEmpty(this.simpleQueryModul.sort)) {
      _.set(p, 'sorting.' + this.simpleQueryModul.sort, this.simpleQueryModul.sortDir === 'asc' ? 'asc' : 'desc');
    } else {
      _.set(p, 'sorting', {});
    }

    if (!_.isEmpty(this.simpleQueryModul.filterKey)) {
      _.set(p, 'filters.' + this.simpleQueryModul.filterKey, Like(this.simpleQueryModul.filterKey,
        Value(this.simpleQueryModul.filterValue ? this.simpleQueryModul.filterValue : '')));
    } else {
      _.set(p, 'filters', {});
    }

    this.simpleItemQuery.requery();
  }
}
