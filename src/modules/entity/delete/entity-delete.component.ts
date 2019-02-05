import {Component, OnInit} from '@angular/core';
import {EntityService} from './../entity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {EntityRef} from '@typexs/schema/libs/registry/EntityRef';

@Component({
  selector: 'entity-delete',
  templateUrl: './entity-delete.component.html'
})
export class EntityDeleteComponent implements OnInit {

  ready: boolean = false;

  machineName: string;

  id: string;

  entityDef: EntityRef;

  instance: any;

  error: any = null;

  deleted: boolean = false;

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
//          await this.router.navigate(['admin/entity', this.machineName, 'query']);
        });
      }
    }
  }

  doAbort() {
    return this.router.navigate(['admin/entity', this.machineName, 'view', this.id]);
  }

  gotoQuery() {
    return this.router.navigate(['admin/entity', this.machineName, 'query']);
  }

}
