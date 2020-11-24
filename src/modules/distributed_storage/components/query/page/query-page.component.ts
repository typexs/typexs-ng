import {Component} from '@angular/core';
import {DistributedStorageQueryEmbeddedComponent} from '../embedded/query-embedded.component';
import {DistributedStorageService} from '../../../services/distributed_storage.service';


@Component({
  selector: 'txs-distributed-storage-query',
  templateUrl: './query-page.component.html',
  styleUrls: ['./query-page.component.scss']
})
export class DistributedStorageQueryPageComponent
  extends DistributedStorageQueryEmbeddedComponent {


  constructor(public _storageService: DistributedStorageService) {
    super(_storageService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
