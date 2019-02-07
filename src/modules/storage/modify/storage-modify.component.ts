import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../storage.service';
import {IEntityRef, ILookupRegistry, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {REGISTRY_TYPEORM, TypeOrmEntityRegistry} from '@typexs/base/browser';
import * as _ from 'lodash';
import {Expressions} from 'commons-expressions/browser';

@Component({
  selector: 'storage-modify',
  templateUrl: './storage-modify.component.html'
})
export class StorageModifyComponent implements OnInit {

  ready: boolean = false;

  new: boolean = true;

  id: any;

  machineName: string;

  entityDef: IEntityRef;

  registry: ILookupRegistry = TypeOrmEntityRegistry.$();

  instance: any;

  error: any = null;

  constructor(private entityService: StorageService,
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
      if (this.id) {
        this.new = false;
        this.entityService.get(this.machineName, this.id).subscribe((entity) => {
          if (entity) {
            this.instance = entity;
          }
        });
      } else {
        this.new = true;
        this.instance = this.entityDef.create();
      }
    } else {
      this.error = `Can't find entity type for ${this.machineName}.`;
    }
    this.ready = true;
  }


  onSubmit($event: any) {
    if ($event.data.isValidated && $event.data.isSuccessValidated) {
      let instance = $event.data.instance;
      if (this.new) {
        this.entityService.save(this.machineName, instance).subscribe(async (res: any) => {
          if (res) {
            let idStr = Expressions.buildLookupConditions(this.entityDef,res);
            // TODO flash message
            await this.router.navigate([this.entityService.getNgUrlPrefix(), this.machineName, 'view', idStr]);
          } else {
            // TODO error?
          }
        });
      } else {
        this.entityService.update(this.machineName, this.id, instance).subscribe(async (res: any) => {
          if (res) {
            let idStr = Expressions.buildLookupConditions(this.entityDef,res);
            // TODO flash message
            await this.router.navigate([this.entityService.getNgUrlPrefix(), this.machineName, 'view', idStr]);
          } else {
            // TODO error?
          }
        });

      }
    }

  }
}
