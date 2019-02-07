import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MetadataStorage} from 'class-validator/metadata/MetadataStorage';
import {getFromContainer} from 'class-validator/container';
import * as _ from 'lodash';
import {IClassRef, IEntityRef, IPropertyRef, LookupRegistry, XS_TYPE_ENTITY, XS_TYPE_PROPERTY} from 'commons-schema-api/browser';
import {StorageService} from '../storage.service';
import {REGISTRY_TYPEORM} from '@typexs/base/browser';


@Component({
  selector: 'storage-struct',
  templateUrl: './storage-struct.component.html',
  styleUrls: ['./storage-struct.component.html']
})
export class StorageStructComponent implements OnInit {

  _machineName: Observable<string>;

  machineName: string;

  entityDef: IEntityRef;

  referrerProps: IPropertyRef[] = [];

  propertyDefs: { property: IPropertyRef, level: number }[] = [];


  constructor(public entityService: StorageService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.entityService.isReady(() => {
      this.route.params.subscribe((params => {
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
    //this.entityService.getRegistry().getEntityRefFor(this.machineName);
    this.entityDef = LookupRegistry.$(REGISTRY_TYPEORM).find(XS_TYPE_ENTITY, (e:IEntityRef) => {
      return e.machineName == machineName;
    });


    this.referrerProps = LookupRegistry.$(REGISTRY_TYPEORM).filter(XS_TYPE_PROPERTY, (referrer: IPropertyRef) => {
      return referrer.isReference() && referrer.getTargetRef() == this.entityDef.getClassRef();
    });
    this.scan(this.entityDef);
  }


  type(propertyDef: IPropertyRef): string {
    if (propertyDef.isEntityReference()) {
      return propertyDef.getTargetRef().name;
    } else {
      return propertyDef.getOptions('type');
    }
  }


  scan(source: IClassRef | IEntityRef, level: number = 0) {
    if (level > 8) return;
    for (let props of source.getPropertyRefs()) {
      this.propertyDefs.push({property: props, level: level});
      if (props.isReference()) {
        this.scan(props.getTargetRef(), level + 1);
      }
    }
  }


  validator(property: IPropertyRef) {
    let validators = getFromContainer(MetadataStorage).getTargetValidationMetadatas(this.entityDef.getClassRef().getClass(), null);
    return _.filter(validators, v => v.propertyName === property.name);
  }


  cardinality(propDef: IPropertyRef) {
    return propDef.isCollection() ? 0 : 1;
  }


  options(propDef: IPropertyRef) {
    let opts = _.clone(propDef.getOptions());
    if (opts.target) {
      delete opts.target;
    }
    return opts;
  }

}
