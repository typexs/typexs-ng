import {Component} from '@angular/core';
import {EntityService} from './entity.service';


@Component({
  selector: 'entity-types',
  templateUrl: './entity-types.component.html'
})
export class EntityTypesComponent {

  constructor(private entityService:EntityService){
  }

  getEntityDefs(){
    return this.entityService.getEntityDefs();
  }
}
