import {Component} from '@angular/core';
import {StorageService} from '../../storage.service';
import {AbstractAggregateEmbeddedComponent} from '../../../base/api/querying/abstract-aggregate-embedded.component';


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

  constructor(private storageService: StorageService) {
    super(storageService);
  }


}
