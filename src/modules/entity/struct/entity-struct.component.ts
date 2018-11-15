import {Component, OnChanges, OnInit} from '@angular/core';
import {EntityService} from './../entity.service';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {EntityDef} from '@typexs/schema/libs/registry/EntityDef';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ClassRef} from '@typexs/schema/libs/registry/ClassRef';
import {PropertyDef} from '@typexs/schema/libs/registry/PropertyDef';
import {LookupRegistry} from '@typexs/schema/libs/LookupRegistry';
import {XS_TYPE_PROPERTY} from '@typexs/schema/libs/Constants';
import {Observable, Subscription} from 'rxjs';
import {MetadataStorage} from 'class-validator/metadata/MetadataStorage';
import {getFromContainer} from 'class-validator/container';
import * as _ from 'lodash';


@Component({
  selector: 'entity-struct',
  templateUrl: './entity-struct.component.html',
  styleUrls: ['./entity-struct.component.scss']
})
export class EntityStructComponent implements OnInit {

  _machineName: Observable<string>;

  machineName: string;

  entityDef: EntityDef;

  referrerProps: PropertyDef[] = [];

  propertyDefs: { property: PropertyDef, level: number }[] = [];


  constructor(private entityService: EntityService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.entityService.isReady(() => {
      this.route.params.subscribe((params => {
        console.log(params);
        if (params.machineName) {
          this.load(params.machineName);
        }
      }));
    });
  }

  load(machineName: string) {
    this.referrerProps = [];
    this.propertyDefs = [];

    this.machineName = machineName;
    this.entityDef = EntityRegistry.$().getEntityDefByName(this.machineName);
    this.referrerProps = LookupRegistry.$().filter(XS_TYPE_PROPERTY, (referrer: PropertyDef) => {
      return referrer.isReference() && referrer.targetRef == this.entityDef.getClassRef();
    });
    this.scan(this.entityDef);
  }


  type(propertyDef: PropertyDef): string {
    if (propertyDef.isEmbedded()) {
      return propertyDef.propertyRef.className;
    } else if (propertyDef.isReference()) {
      return propertyDef.targetRef.className;
    } else {
      return propertyDef.dataType;
    }
  }

  scan(source: ClassRef | EntityDef, level: number = 0) {
    if (level > 8) return;
    for (let props of source.getPropertyDefs()) {
      this.propertyDefs.push({property: props, level: level});
      if (props.isReference()) {
        this.scan(props.targetRef, level + 1);
      } else if (!props.isInternal()) {
        this.scan(props.propertyRef, level + 1);
      }
    }
  }

  validator(property:PropertyDef){
    let validators = getFromContainer(MetadataStorage).getTargetValidationMetadatas(this.entityDef.getClass(),null);
    return _.filter(validators,v => v.propertyName === property.name);
  }


}
