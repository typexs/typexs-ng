import {Component, Input} from '@angular/core';
import {AbstractQueryEmbeddedComponent} from '../../../../base/api/querying/abstract-query-embedded.component';
import {DistributedStorageService} from '../../../services/distributed_storage.service';
import {DEFAULT_DS_OPTIONS, IDSOptions} from '../../../lib/IDSOptions';


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

  @Input()
  options: IDSOptions = DEFAULT_DS_OPTIONS;


  constructor(private service: DistributedStorageService) {
    super(service);
  }

  // reset loading entity
  ngOnInit() {
    if (!this.params) {
      this.params = {};
    }

    this.applyInitialOptions();
    if (this.entityName && !this.options.entityTypeSelection) {
      setTimeout(() => {
        this.requery();
      });
    }
    // this.service.isLoaded().subscribe(x => this.findEntityDef());
  }


}
