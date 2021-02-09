import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {StorageService} from '../storage.service';
import {IEntityRef, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {REGISTRY_TYPEORM} from '@typexs/base';
import * as _ from 'lodash';

@Component({
  selector: 'storage-view',
  templateUrl: './storage-view.component.html'
})
export class StorageViewComponent implements OnInit {

  ready = false;

  name: string;

  id: string;

  entityDef: IEntityRef;

  instance: any;

  error: any = null;

  constructor(public entityService: StorageService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.entityService.isLoaded().subscribe(x => {
      this.load();
    });
  }


  load() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.id = this.route.snapshot.paramMap.get('id');
    this.entityDef = this.entityService.getRegistry().getEntityRefFor(this.name);
    if (this.entityDef) {
      this.entityService.get(this.name, this.id).subscribe((entity: any) => {
        this.instance = entity;
        this.ready = true;
      });
    } else {
      this.error = `Can't find entity type for ${this.name}.`;
    }

  }


}
