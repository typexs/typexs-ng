import {Injectable} from '@angular/core';
import {ComponentRegistry} from '../../../libs/views/ComponentRegistry';
import {IComponentBinding} from '../../../libs/views/IComponentBinding';
import {ClassUtils} from 'commons-base/browser';
import * as _ from 'lodash';
import {C_DEFAULT} from '../constants';

@Injectable()
export class ComponentRegistryService {

  registry: ComponentRegistry = ComponentRegistry.$();

  components: { [name: string]: Function } = {};

  getOrCreateDef(typeName: string | string[], normalize: boolean = false): IComponentBinding {
    return this.registry.getOrCreateDef(typeName, normalize);
  }

  getDef(typeName: string | string[], normalize: boolean = false): IComponentBinding {
    console.log(typeName);
    return this.registry.getDef(typeName, normalize);
  }


  getComponentForObject(obj: any, context: string = C_DEFAULT) {
    const className = _.snakeCase(ClassUtils.getClassName(obj));
    const list = this.registry.filter(x =>
      !!x.handle && _.snakeCase(x.handle.name) === className
    );
    if (list.length === 0) {
      return null;
    }
    const lookupKey = [className, context].map(x => _.snakeCase(x)).join('.');
    return list.find(x => x.type === lookupKey);
  }


  getComponentClass(...args: string[]) {
    return this.registry.getComponentClass(args);
  }


  setComponentClass(name: string | string[], fn: Function) {
    return this.registry.setComponentClass(name, fn);
  }

  setComponentForClass(comp: Function, handle: Function, context: string = C_DEFAULT) {
    return this.registry.setComponentForClass(comp, handle, context);
  }

}
