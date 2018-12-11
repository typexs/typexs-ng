import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {EntityService} from './../entity.service';
import {ActivatedRoute} from '@angular/router';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {EntityDef} from '@typexs/schema/libs/registry/EntityDef';
import {PropertyDef} from '@typexs/schema/libs/registry/PropertyDef';

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

  page: number = 0;

  error: any = null;

  constructor(private entityService: EntityService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.entityService.isReady(() => {
      this.query();
    });
  }

  getPropertyDefs() {
    if (this.entityDef) {
      return this.entityDef.getPropertyDefs();
    } else {
      return [];
    }
  }


  query(query?: any) {
    this.machineName = this.route.snapshot.paramMap.get('machineName');
    this.entityDef = EntityRegistry.$().getEntityDefByName(this.machineName);
    if (this.entityDef) {
      this.entityService.query(this.machineName, query, {limit: 25}).subscribe(
        (results: any) => {
          if (results) {
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

  asString(data: any) {
    return JSON.stringify(data, null, 2);
  }

  hasData(entity: any, prop: PropertyDef) {
    return !_.isEmpty(this.getData(entity, prop));
  }

  getData(entity: any, prop: PropertyDef) {
    return prop.get(entity);
  }

  fieldDisplay(prop: PropertyDef) {
    if (prop.isEntityReference()) {
      if (prop.isCollection()) {
        return 'entity_reference_array';
      } else {
        return 'entity_reference';
      }
    } else if (prop.isReference()) {
      if (prop.isCollection()) {
        return 'object_reference_array';
      } else {
        return 'object_reference';
      }
    } else {
      return 'value';
    }
  }

}
