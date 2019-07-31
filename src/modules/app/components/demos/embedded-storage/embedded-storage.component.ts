import * as _ from 'lodash';
import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDTGridOptions} from '../../../../system/datatable/IDTGridOptions';
import {IQueryParams} from '../../../../system/datatable/IQueryParams';
import {Like, Value} from 'commons-expressions/browser';
import {StorageQueryEmbeddedComponent} from '../../../../storage/query/embedded/storage-query-embedded.component';
import {IEntityRef} from 'commons-schema-api/browser';
import {StorageService} from '../../../../storage/storage.service';



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
  selector: 'embedded-storage',
  templateUrl: 'embedded-storage.component.html',
})
export class EmbeddedStorageComponent implements OnInit, OnChanges {

  simpleItemName = 'SimpleItem';

  simpleItemOptions: IDTGridOptions = {
    limit: 10,
    enablePager: true,
    freeQueryBuilder: false,
    pagerId: 'page'
  };

  simpleItemParams: IQueryParams;

  @ViewChild('simpleItem01', {static: true})
  simpleItemQuery: StorageQueryEmbeddedComponent;

  simpleQueryModul = new C();

  entityRef: IEntityRef;

  constructor(private storageService: StorageService) {

  }


  ngOnInit(): void {
    this.storageService.isReady(() => {
      this.entityRef = this.storageService.getEntityRefForName('SimpleItem');
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
