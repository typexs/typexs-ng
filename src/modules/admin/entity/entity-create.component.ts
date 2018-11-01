import {Component, OnInit} from '@angular/core';
import {EntityService} from './entity.service';
import {ActivatedRoute} from '@angular/router';
import {EntityRegistry} from 'typexs-schema/libs/EntityRegistry';
import {EntityDef} from 'typexs-schema/libs/registry/EntityDef';
import * as _ from 'lodash';

@Component({
  selector: 'entity-create',
  templateUrl: './entity-create.component.html'
})
export class EntityCreateComponent implements OnInit {

  ready: boolean = false;

  machineName: string;

  entityDef: EntityDef;

  instance: any;

  error: any = null;

  constructor(private entityService: EntityService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let sub = this.entityService.isReady();
    sub.subscribe(null, null, () => {
      this.load();
    });
  }

  load() {
    this.machineName = this.route.snapshot.paramMap.get('machineName');
    this.entityDef = EntityRegistry.$().getEntityDefByName(this.machineName);
    if (this.entityDef) {
      this.instance = this.entityDef.new();
    } else {
      this.error = `Can't find entity type for ${this.machineName}.`;
    }
    this.ready = true;
  }



  onSubmit($event: any) {

    console.log($event);
    if ($event.data.isValidated && $event.data.isSuccessValidated) {
      this.entityService.create(this.machineName, this.instance).subscribe((res: any) => {
        console.log('saved', res);
        if(res){
          _.merge(this.instance,res);
          //_.merge(this.instance,res);
        }
      });
    }

  }
}
