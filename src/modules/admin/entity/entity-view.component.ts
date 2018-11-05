import {Component, OnInit} from '@angular/core';
import {EntityService} from './entity.service';
import {ActivatedRoute} from '@angular/router';
import {EntityRegistry} from 'typexs-schema/libs/EntityRegistry';
import {EntityDef} from 'typexs-schema/libs/registry/EntityDef';
import * as _ from 'lodash';

@Component({
  selector: 'entity-view',
  templateUrl: './entity-view.component.html'
})
export class EntityViewComponent implements OnInit {

  ready: boolean = false;

  machineName: string;

  id: string;

  entityDef: EntityDef;

  instance: any;

  error: any = null;

  constructor(private entityService: EntityService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.entityService.isReady(() => {
      this.load();
    });
  }


  load() {
    this.machineName = this.route.snapshot.paramMap.get('machineName');
    this.id = this.route.snapshot.paramMap.get('id');
    this.entityDef = EntityRegistry.$().getEntityDefByName(this.machineName);
    if (this.entityDef) {
      this.entityService.get(this.machineName, this.id).subscribe((entity) => {
        this.instance = entity;
      });
    } else {
      this.error = `Can't find entity type for ${this.machineName}.`;
    }
    this.ready = true;
  }


}
