import {Component, OnInit} from '@angular/core';
import {EntityService} from './entity.service';
import {ActivatedRoute} from '@angular/router';
import {EntityRegistry} from 'typexs-schema/libs/EntityRegistry';
import {EntityDef} from 'typexs-schema/libs/registry/EntityDef';
import * as _ from 'lodash';

@Component({
  selector: 'entity-query',
  templateUrl: './entity-query.component.html'
})
export class EntityQueryComponent implements OnInit {

  ready: boolean = false;

  machineName: string;

  id: string;

  entityDef: EntityDef;

  entities: any[] = [];

  count: number = 0;

  limit: number = 25;

  offset: number = 25;

  page:number = 0;

  error: any = null;

  constructor(private entityService: EntityService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    let sub = this.entityService.isReady();
    sub.subscribe(null, null, () => {
      this.query();
    });
  }

  getPropertyDefs(){
    if(this.entityDef){
      return this.entityDef.getPropertyDefs();
    }else{
      return [];
    }
  }


  query(query?: any) {
    this.machineName = this.route.snapshot.paramMap.get('machineName');
    this.entityDef = EntityRegistry.$().getEntityDefByName(this.machineName);
    if (this.entityDef) {
      this.entityService.query(this.machineName, query, {limit: 25}).subscribe(
        (results: any) => {
          if(results){
            this.entities = results.entities;
            this.count = results.$count;
            this.limit = results.$limit;
            this.offset = results.$offset;
          }
        }
      );
    } else {
      this.error = `Can't find entity type for ${this.machineName}.`;
    }
  }


}
