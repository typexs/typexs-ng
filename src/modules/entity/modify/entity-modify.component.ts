import {Component, OnInit} from '@angular/core';
import {EntityService} from './../entity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {EntityRef} from '@typexs/schema/libs/registry/EntityRef';

@Component({
  selector: 'entity-modify',
  templateUrl: './entity-modify.component.html'
})
export class EntityModifyComponent implements OnInit {

  ready: boolean = false;

  new: boolean = true;

  id: any;

  machineName: string;

  entityDef: EntityRef;

  instance: any;

  error: any = null;

  constructor(private entityService: EntityService,
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
    this.entityDef = EntityRegistry.$().getEntityRefByName(this.machineName);
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
        this.instance = this.entityDef.new();
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
            let idStr = this.entityDef.buildLookupConditions(res);
            // TODO flash message
            await this.router.navigate([this.entityService.getNgUrlPrefix(), this.machineName, 'view', idStr]);
          } else {
            // TODO error?
          }
        });
      } else {
        this.entityService.update(this.machineName, this.id, instance).subscribe(async (res: any) => {
          if (res) {
            let idStr = this.entityDef.buildLookupConditions(res);
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
