import * as _ from 'lodash';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {PagerAction} from '../../system/pager/PagerAction';
import {PagerService} from '../../system/pager/PagerService';
import {Pager} from '../../system/pager/Pager';
import {StorageQueryAction} from './StorageQueryAction';
import {StorageService} from '../storage.service';
import {IEntityRef, IPropertyRef, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {REGISTRY_TYPEORM} from '@typexs/base/browser';
import {Expressions} from 'commons-expressions';


@Component({
  selector: 'txs-storage-query',
  templateUrl: './storage-query.component.html',
  styleUrls: ['./storage-query.component.scss']
})
export class StorageQueryComponent implements OnInit, OnDestroy {

  pagerId: string = 'page';

  ready: boolean = false;

  machineName: string;

  id: string;

  entityDef: IEntityRef;

  entities: any[] = [];

  count: number = 0;

  _query: any = null;

  limit: number = 25;

  offset: number = 0;

  page: number = 0;

  error: any = null;

  pager: Pager;

  constructor(public entityService: StorageService,
              private route: ActivatedRoute,
              private pagerService: PagerService) {
    this.pager = this.pagerService.get(this.pagerId);
  }


  onQueryAction(action: StorageQueryAction) {
    this.query(action.query);
  }

  ngOnInit() {
    this.entityService.isReady(() => {
      this.query();
    });
  }

  getPropertyRefs() {
    if (this.entityDef) {
      return this.entityDef.getPropertyRefs();
    } else {
      return [];
    }
  }


  updateEntities(action: PagerAction) {
    if (action.name == this.pagerId && action.type == 'set') {
      this.offset = (action.page - 1) * this.limit;
      this.query(this._query);
    }
  }

  query(query?: any) {
    this._query = query;
    this.machineName = this.route.snapshot.paramMap.get('machineName');
    this.entityDef = LookupRegistry.$(REGISTRY_TYPEORM).find(XS_TYPE_ENTITY, (e: IEntityRef) => {
      return e.machineName == _.snakeCase(this.machineName);
    });
    if (this.entityDef) {
      this.entityService.query(this.machineName, query, {
        offset: this.offset,
        limit: this.limit
      }).subscribe(
        (results: any) => {
          if (results) {
            this.entities = results.entities;
            this.count = results.$count;
            this.limit = results.$limit;
            this.offset = results.$offset;
            this.pager.totalPages = Math.ceil(this.count * 1.0 / this.limit * 1.0);
            this.pager.currentPage = (this.offset / this.limit) + 1;
            this.pager.calculatePages();

          }
        }
      );
    } else {
      this.error = `Can't find entity type for ${this.machineName}.`;
    }
  }

  buildLookupConditions(e: IEntityRef, res: any) {
    return Expressions.buildLookupConditions(e, res);
  }


  asString(data: any) {
    if (_.isObjectLike(data)) {
      return JSON.stringify(data, null, 2);
    } else {
      return data;
    }

  }

  hasData(entity: any, prop: IPropertyRef) {
    return !_.isEmpty(this.getData(entity, prop));
  }

  getData(entity: any, prop: IPropertyRef) {
    return prop.get(entity);
  }

  fieldDisplay(prop: IPropertyRef) {
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

  ngOnDestroy(): void {
    this.pagerService.remove(this.pagerId);
  }
}
