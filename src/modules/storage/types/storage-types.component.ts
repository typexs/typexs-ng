import {Component} from '@angular/core';
import {StorageService} from '../storage.service';


@Component({
  selector: 'storage-types',
  templateUrl: './storage-types.component.html'
})
export class StorageTypesComponent {

  constructor(private storageService: StorageService) {
  }

  getEntityRefs() {
    return this.storageService.getEntityRefs();
  }
}
