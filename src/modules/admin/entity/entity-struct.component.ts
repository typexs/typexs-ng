import {Component, OnInit} from '@angular/core';
import {EntityService} from './entity.service';
import {EntityRegistry} from 'typexs-schema/libs/EntityRegistry';
import {EntityDef} from 'typexs-schema/libs/registry/EntityDef';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'entity-struct',
  templateUrl: './entity-struct.component.html'
})
export class EntityStructComponent implements OnInit {

  machineName: string;

  entityDef: EntityDef;

  constructor(private entityService: EntityService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.entityService.isReady(()  => {
      this.load();
    });
  }

  load(){
    this.machineName = this.route.snapshot.paramMap.get('machineName');
    this.entityDef = EntityRegistry.$().getEntityDefByName(this.machineName);
    console.log(this.entityDef)
    console.log(this.entityDef.getPropertyDefs())
  }


}
