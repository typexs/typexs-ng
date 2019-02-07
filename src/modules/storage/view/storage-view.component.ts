import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {StorageService} from '../storage.service';
import {IEntityRef, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {REGISTRY_TYPEORM} from '@typexs/base/browser';
import * as _ from 'lodash';

@Component({
  selector: 'storage-view',
  templateUrl: './storage-view.component.html'
})
export class StorageViewComponent implements OnInit {

  ready: boolean = false;

  machineName: string;

  id: string;

  entityDef: IEntityRef;

  instance: any;

  error: any = null;

  constructor(public entityService: StorageService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.entityService.isReady(() => {
      this.load();
    });
  }


  load() {
    this.machineName = this.route.snapshot.paramMap.get('machineName');
    this.id = this.route.snapshot.paramMap.get('id');
    this.entityDef = LookupRegistry.$(REGISTRY_TYPEORM).find(XS_TYPE_ENTITY, (e:IEntityRef) => {return e.machineName == _.snakeCase(this.machineName)});
    if (this.entityDef) {
      this.entityService.get(this.machineName, this.id).subscribe((entity: any) => {
        this.instance = entity;
      });
    } else {
      this.error = `Can't find entity type for ${this.machineName}.`;
    }
    this.ready = true;
  }


}
