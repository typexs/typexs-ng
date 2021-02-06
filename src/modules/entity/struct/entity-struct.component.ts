import {getMetadataStorage} from 'class-validator';
import {Component, OnInit} from '@angular/core';
import {EntityService} from './../entity.service';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {EntityRef} from '@typexs/schema/libs/registry/EntityRef';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertyRef} from '@typexs/schema/libs/registry/PropertyRef';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {ClassRef, LookupRegistry, XS_TYPE_PROPERTY} from 'commons-schema-api/browser';


@Component({
  selector: 'entity-struct',
  templateUrl: './entity-struct.component.html',
  styleUrls: ['./entity-struct.component.scss']
})
export class EntityStructComponent implements OnInit {

  _name: Observable<string>;

  name: string;

  entityDef: EntityRef;

  referrerProps: PropertyRef[] = [];

  propertyDefs: { property: PropertyRef, level: number }[] = [];


  constructor(public entityService: EntityService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.entityService.isReady(() => {
      this.route.params.subscribe((params => {
        if (params.name) {
          this.load(params.name);
        }
      }));
    });
  }

  load(name: string) {
    this.referrerProps = [];
    this.propertyDefs = [];

    this.name = name;
    this.entityDef = EntityRegistry.$().getEntityRefByName(this.name);
    this.referrerProps = LookupRegistry.$().filter(XS_TYPE_PROPERTY, (referrer: PropertyRef) => {
      return referrer.isReference() && referrer.targetRef === this.entityDef.getClassRef();
    });
    this.scan(this.entityDef);
  }


  type(propertyDef: PropertyRef): string {
    if (propertyDef.isEmbedded()) {
      return propertyDef.propertyRef.className;
    } else if (propertyDef.isReference()) {
      return propertyDef.targetRef.className;
    } else {
      return propertyDef.dataType;
    }
  }

  scan(source: ClassRef | EntityRef, level: number = 0) {
    if (level > 8) {
      return;
    }
    for (const props of <PropertyRef[]>source.getPropertyRefs()) {
      this.propertyDefs.push({property: props, level: level});
      if (props.isReference()) {
        this.scan(props.getTargetRef(), level + 1);
      } else if (!props.isInternal()) {
        this.scan(props.propertyRef, level + 1);
      }
    }
  }

  validator(property: PropertyRef) {
    const validators = getMetadataStorage().getTargetValidationMetadatas(this.entityDef.getClass(), null, true, false);
    return _.filter(validators, v => v.propertyName === property.name);
  }

  cardinality(propDef: PropertyRef) {
    return propDef.cardinality;
  }

  options(propDef: PropertyRef) {
    const opts = _.clone(propDef.getOptions());
    if (opts.sourceClass) {
      delete opts.sourceClass._cacheEntity;
    }
    return opts;
  }

}
