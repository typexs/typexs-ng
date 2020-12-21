import {NoFormHandlerDefinedForTypeError} from './../../libs/exceptions/NoFormHandlerDefinedForTypeError';
import {IComponentBinding} from './IComponentBinding';
import * as _ from 'lodash';
import {C_DEFAULT} from '../../modules/base/constants';
import {ClassUtils} from 'commons-base/browser';

export class ComponentRegistry {

  private constructor() {
  }

  private static $self: ComponentRegistry = null;

  private handler: IComponentBinding[] = [];

  static $(): ComponentRegistry {
    if (!this.$self) {
      this.$self = new ComponentRegistry();
    }
    return this.$self;
  }

  static addHandle(typeName: string, handle: Function): IComponentBinding {
    const res = this.$().addHandle(typeName, handle);
    return res;
  }

  static addComponent(typeName: string, comp: Function): IComponentBinding {
    const res = this.$().addComponent(typeName, comp);
    return res;
  }

  static createHandle<T>(typeName: string): T {
    const res = this.$().createHandle<T>(typeName);
    return res;
  }

  static createComponent<T>(typeName: string): T {
    const res = this.$().createComponent<T>(typeName);
    return res;
  }

  addHandle(typeName: string | string[], handle: Function): IComponentBinding {
    const def = this.getOrCreateDef(this.normalizeContext(typeName));
    def.handle = handle;
    return def;
  }

  addComponent(typeName: string | string[], comp: Function): IComponentBinding {
    const def = this.getOrCreateDef(this.normalizeContext(typeName));
    def.component = comp;
    return def;
  }

  normalizeContext(typeName: string | string[]): string {
    if (_.isArray(typeName)) {
      typeName = typeName.map(x => _.snakeCase(x)).join('.');
    } else {
      typeName = _.snakeCase(typeName);
    }
    return typeName;
  }

  createHandle<T>(typeName: string): T {
    const handler = this.getOrCreateDef(this.normalizeContext(typeName));
    if (!handler || !handler.handle) {
      throw new NoFormHandlerDefinedForTypeError(typeName);
    }
    const obj = Reflect.construct(handler.handle, []);
    obj.type = typeName;
    return obj;
  }

  createComponent<T>(typeName: string): T {
    const handler = this.getOrCreateDef(this.normalizeContext(typeName));
    if (!handler || !handler.component) {
      throw new NoFormHandlerDefinedForTypeError(typeName);
    }
    const obj = Reflect.construct(handler.component, []);
    obj.type = typeName;
    return obj;
  }

  getComponentClass(context: string | string[]): any {
    context = this.normalizeContext(context);
    const found = this.handler.find(x => x.type === context);
    if (found) {
      return found.component;
    }
    return null;
  }

  setComponentClass(name: string | string[], fn: Function): Function {
    const binding = this.addComponent(name, fn);
    if (binding) {
      return fn;
    }
    return null;
  }

  filter(f: (x: IComponentBinding) => boolean): IComponentBinding[] {
    return this.handler.filter(f);
  }

  getOrCreateDef(typeName: string | string[], normalize: boolean = false): IComponentBinding {
    typeName = normalize || _.isArray(typeName) ? this.normalizeContext(typeName) : typeName;
    let exists = _.find(this.handler, {type: typeName as string});
    if (!exists) {
      exists = {type: typeName};
      this.handler.push(exists);
    }
    return exists;
  }

  getDef(typeName: string | string[], normalize: boolean = false): IComponentBinding {
    typeName = normalize || _.isArray(typeName) ? this.normalizeContext(typeName) : typeName;
    return _.find(this.handler, {type: typeName});
  }


  setComponentForClass(comp: Function, handle: Function, context: string = C_DEFAULT): IComponentBinding {
    const className = _.snakeCase(ClassUtils.getClassName(handle));
    const lookupKey = [className, context].map(x => _.snakeCase(x)).join('.');
    const binding = this.getOrCreateDef(lookupKey, false);
    binding.component = comp;
    binding.handle = handle;
    return binding;

  }

}

