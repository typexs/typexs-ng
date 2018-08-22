import {NoFormHandlerDefinedForTypeError} from './../../libs/exceptions/NoFormHandlerDefinedForTypeError';
import {IElementDef} from './IElementDef';
import * as _ from '../../libs/LoDash';

export class ContentComponentRegistry {

  private static $self: ContentComponentRegistry = null;

  private formHandler: IElementDef[] = [];

  private constructor() {
  }

  static $(): ContentComponentRegistry {
    if (!this.$self) {
      this.$self = new ContentComponentRegistry();
    }
    return this.$self;
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

  static addHandler(typeName: string, klass: Function) {
    let def = this.$().getOrCreateDef(typeName);
    def.handler = klass;
    return def;
  }


  static addComponent(typeName: string, klass: Function) {
    let def = this.$().getOrCreateDef(typeName);
    def.component = klass;
    return def;
  }

  static createHandler(typeName: string) {
    let handler = this.$().getOrCreateDef(typeName);
    if (!handler || !handler.handler) {
      throw new NoFormHandlerDefinedForTypeError(typeName);
    }
    let obj = Reflect.construct(handler.handler, []);
    obj.type = typeName;
    return obj;
  }

  static createComponent(typeName: string) {
    let handler = this.$().getOrCreateDef(typeName);
    if (!handler || !handler.component) {
      throw new NoFormHandlerDefinedForTypeError(typeName);
    }
    let obj = Reflect.construct(handler.component, []);
    obj.type = typeName;
    return obj;
  }

}

