import {NoFormHandlerDefinedForTypeError} from './../../libs/exceptions/NoFormHandlerDefinedForTypeError';
import {IElementDef} from './IElementDef';
import * as _ from 'lodash';

export class ContentComponentRegistry {

  private constructor() {
  }

  private static $self: ContentComponentRegistry = null;

  private formHandler: IElementDef[] = [];

  static $(): ContentComponentRegistry {
    if (!this.$self) {
      this.$self = new ContentComponentRegistry();
    }
    return this.$self;
  }

  static addHandler(typeName: string, klass: Function) {
    const def = this.$().getOrCreateDef(typeName);
    def.handler = klass;
    return def;
  }


  static addComponent(typeName: string, klass: Function) {
    const def = this.$().getOrCreateDef(typeName);
    def.component = klass;
    return def;
  }

  static createHandler(typeName: string) {
    const handler = this.$().getOrCreateDef(typeName);
    if (!handler || !handler.handler) {
      throw new NoFormHandlerDefinedForTypeError(typeName);
    }
    const obj = Reflect.construct(handler.handler, []);
    obj.type = typeName;
    return obj;
  }

  static createComponent(typeName: string) {
    const handler = this.$().getOrCreateDef(typeName);
    if (!handler || !handler.component) {
      throw new NoFormHandlerDefinedForTypeError(typeName);
    }
    const obj = Reflect.construct(handler.component, []);
    obj.type = typeName;
    return obj;
  }

  getOrCreateDef(typeName: string): IElementDef {
    let exists = _.find(this.formHandler, {type: typeName});
    if (!exists) {
      exists = {type: typeName};
      this.formHandler.push(exists);
    }
    return exists;
  }

  getDef(typeName: string): IElementDef {
    return _.find(this.formHandler, {type: typeName});
  }

}

