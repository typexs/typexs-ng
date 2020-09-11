import {Component, Input} from '@angular/core';
import {AbstractQueryEmbeddedComponent} from '../../../../base/api/querying/abstract-query-embedded.component';
import {DistributedStorageService} from '../../../services/distributed_storage.service';
import * as _ from 'lodash';


/**
 * Storage query embedded component
 *
 * Possibilities:
 * - sorting
 * - filters
 * - extend/add specialized columns
 */
@Component({
  selector: 'txs-distributed-storage-query-embedded',
  templateUrl: './query-embedded.component.html',
  styleUrls: ['./query-embedded.component.scss']
})
export class DistributedStorageQueryEmbeddedComponent
  extends AbstractQueryEmbeddedComponent {

  @Input()
  entityName: string;

  constructor(private service: DistributedStorageService) {
    super(service);
  }

  // reset loading entity
  ngOnInit() {
    if (!this.params) {
      this.params = {};
    }

    if (this.options) {
      this.params.offset = _.get(this.options, 'offset', 0);
      this.params.limit = _.get(this.options, 'limit', 25);
    }

    this.service.isReady((value: boolean, error: Error) => {
      if (!value) {
        return;
      }

      this.findEntityDef();
      // this.initialiseColumns();

      // api maybe not loaded
      // setTimeout(() => {
      //   this.doAggregate(this.datatable.api());
      // });
    });
  }


}
