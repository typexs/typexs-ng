import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {ClassUtils} from 'commons-base/browser';
import {IEntityRef, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {IQueringService} from './../api/querying/IQueringService';
import {forkJoin} from 'rxjs';

@Injectable()
export class EntityResolverService {

  ngEntityPrefix = 'entity';

  cache: { [k: string]: any } = {};

  queryServices: IQueringService[] = [];

  registerService(service: IQueringService) {
    if (!this.queryServices.find(x => x === service)) {
      this.queryServices.push(service);
    }
  }

  isLoaded() {
    return forkJoin(this.queryServices.map(x => x.isLoaded()));
  }

  defaultRouteBuilder(entityRef: IEntityRef, idKeys: { [prop: string]: any }) {
    return ['', this.ngEntityPrefix, _.snakeCase(entityRef.name), encodeURIComponent(_.values(idKeys).join('--'))].join('/');
  }

  getEntityRef(obj: any): IEntityRef {
    const className = ClassUtils.getClassName(obj);
    const key = 'class.' + _.snakeCase(className);
    if (this.cache[key]) {
      return this.cache[key];
    }
    const returnRef = LookupRegistry.find(XS_TYPE_ENTITY, (x: IEntityRef) => _.snakeCase(x.name) === _.snakeCase(className)) as IEntityRef;
    if (!returnRef) {
      throw new Error('no entity ref found for ' + className + ' of ' + JSON.stringify(obj, null, 2));
    }
    this.cache[key] = returnRef;
    return returnRef;
  }

  getServiceForEntity(entityRef: any) {
    return this.queryServices.find(x => !_.isEmpty(x.getRegistry().listEntities(x => x === entityRef)));
  }

  getServiceFor(obj: any) {
    const entityRef = this.getEntityRef(obj);
    return this.getServiceForEntity(entityRef);
  }

  getIdKeysFor(obj: any) {
    if (obj['ngRoute'] && _.isFunction(obj['ngRoute'])) {
      return obj['ngRoute']();
    }
    const entityRef = this.getEntityRef(obj);
    const key = 'id.' + _.snakeCase(entityRef.name);
    if (this.cache[key]) {
      return this.cache[key](obj);
    }
    const idProps = entityRef.getPropertyRefs().filter(x => x.isIdentifier());


    this.cache[key] = (obj: any) => {
      const ret = {};
      idProps.forEach(x => {
        ret[x.name] = x.get(obj);
      });
      return ret;
    };
    return this.cache[key](obj);
  }


  getLabelKeysFor(obj: any) {
    const entityRef = this.getEntityRef(obj);
    const key = 'label.' + _.snakeCase(entityRef.name);
    if (this.cache[key]) {
      return this.cache[key](obj);
    }
    const labelProps = entityRef.getPropertyRefs().filter(x => x.getOptions('form') === 'label');


    this.cache[key] = (obj: any) => {
      const ret = {};
      labelProps.forEach(x => {
        ret[x.name] = x.get(obj);
      });
      return ret;
    };
    return this.cache[key](obj);
  }


  getRouteFor(obj: any) {
    const entityRef = this.getEntityRef(obj);
    const idKEys = this.getIdKeysFor(obj);
    return this.defaultRouteBuilder(entityRef, idKEys);
  }


  getLabelFor(obj: any) {
    if (obj['label'] && _.isFunction(obj['label'])) {
      return obj['label']();
    }
    if (obj['ngLabel'] && _.isFunction(obj['ngLabel'])) {
      return obj['ngLabel']();
    }

    const keys = this.getLabelKeysFor(obj);
    const values = _.values(keys);
    if (values.length === 0) {
      return 'Unknown';
    }
    const label = values.join(' - ').trim();
    return _.isEmpty(label) ? 'Unknown' : label;
  }

}
