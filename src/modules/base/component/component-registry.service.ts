import {Inject, Injectable} from '@angular/core';
import {ComponentRegistry} from '../../../libs/views/ComponentRegistry';
import {IBindingInfo, IComponentBinding} from '../../../libs/views/IComponentBinding';
import {ClassUtils} from 'commons-base/browser';
import * as _ from 'lodash';
import {C_DEFAULT} from '../constants';
import {ObjectToComponentResolver} from './ObjectToComponentResolver';

@Injectable()
export class ComponentRegistryService {

  registry: ComponentRegistry = ComponentRegistry.$();

  components: { [name: string]: Function } = {};


  constructor(@Inject(ObjectToComponentResolver) private resolver: ObjectToComponentResolver) {
  }

  getOrCreateDef(typeName: string | string[], normalize: boolean = false): IComponentBinding {
    return this.registry.getOrCreateDef(typeName, normalize);
  }

  getDef(typeName: string | string[], normalize: boolean = false): IComponentBinding {
    return this.registry.getDef(typeName, normalize);
  }


  getComponentForObject(obj: any, context: string = C_DEFAULT) {
    if (this.resolver) {
      const found = this.resolver.resolve(obj, context);
      if (found) {
        return found;
      }
    }
    const _className = ComponentRegistry.getClassName(obj);
    const className = _.snakeCase(_className);
    const list = this.registry.forHandle(_className);
    if (list.length === 0) {
      return null;
    }
    // return look for special mode context
    const lookupKey = [className, context].map(x => _.snakeCase(x)).join('.');
    const found = list.find(x => x.key === lookupKey);
    if (found) {
      return found;
    }
    // return default
    const lookupDefaultKey = [className, C_DEFAULT].map(x => _.snakeCase(x)).join('.');
    return list.find(x => x.key === lookupDefaultKey);
  }


  getComponentClass(...args: string[]) {
    return this.registry.getComponentClass(args);
  }


  setComponentClass(name: string | string[], fn: Function, extra: IBindingInfo = null) {
    return this.registry.setComponentClass(name, fn, extra);
  }

  setComponentForClass(comp: Function, handle: Function | string | RegExp, extra: IBindingInfo = null) {
    return this.registry.setComponentForClass(comp, handle, extra);
  }

}
