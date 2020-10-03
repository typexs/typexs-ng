import {Component, OnInit} from '@angular/core';
import {EntityService} from './../entity.service';
import {ActivatedRoute} from '@angular/router';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {EntityRef} from '@typexs/schema/libs/registry/EntityRef';

@Component({
  selector: 'entity-view',
  templateUrl: './entity-view.component.html'
})
export class EntityViewComponent implements OnInit {

  ready: boolean = false;

  name: string;

  id: string;

  entityDef: EntityRef;

  instance: any;

  error: any = null;

  constructor(public entityService: EntityService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.entityService.isReady(() => {
      this.load();
    });
  }


  load() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.id = this.route.snapshot.paramMap.get('id');
    this.entityDef = EntityRegistry.$().getEntityRefByName(this.name);
    if (this.entityDef) {
      this.entityService.get(this.name, this.id).subscribe((entity: any) => {
        this.instance = entity;
      });
    } else {
      this.error = `Can't find entity type for ${this.name}.`;
    }
    this.ready = true;
  }


}
