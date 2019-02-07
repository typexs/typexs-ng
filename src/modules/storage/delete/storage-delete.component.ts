import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../storage.service';
import {IEntityRef, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {REGISTRY_TYPEORM} from '@typexs/base/browser';
import * as _ from 'lodash';

@Component({
  selector: 'txs-storage-delete',
  templateUrl: './storage-delete.component.html'
})
export class StorageDeleteComponent implements OnInit {

  ready: boolean = false;

  machineName: string;

  id: string;

  entityDef: IEntityRef;

  instance: any;

  error: any = null;

  deleted: boolean = false;

  constructor(public entityService: StorageService,
              private route: ActivatedRoute,
              private router: Router) {
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
      this.entityService.get(this.machineName, this.id).subscribe((entity) => {
        this.instance = entity;
      });
    } else {
      this.error = `Can't find entity type for ${this.machineName}.`;
    }
    this.ready = true;
  }


  doDelete() {
    if (!this.error) {
      if (this.entityDef && this.instance) {
        this.entityService.delete(this.machineName, this.id).subscribe(async (entity) => {
          // TODO maybe wait
          this.instance = entity;
          this.deleted = true;
//          await this.router.navigate([entityService.getNgUrlPrefix(), this.machineName, 'query']);
        });
      }
    }
  }

  doAbort() {
    return this.router.navigate([this.entityService.getNgUrlPrefix(), this.machineName, 'view', this.id]);
  }

  gotoQuery() {
    return this.router.navigate([this.entityService.getNgUrlPrefix(), this.machineName, 'query']);
  }

}
