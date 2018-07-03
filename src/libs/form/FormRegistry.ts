import * as _ from 'lodash';
import {NoFormHandlerDefinedForTypeError} from './exceptions/NoFormHandlerDefinedForTypeError';
import {IElementDef} from './IElementDef';


export class FormRegistry {

  private static $self: FormRegistry;

  private formHandler: IElementDef[] = [];

  private constructor() {
  }

  static $(): FormRegistry {
    if (!this.$self) {
      this.$self = new FormRegistry();
    }
    return this.$self;
  }

  private getOrCreateDef(typeName: string): IElementDef {
    let exists = _.find(this.formHandler, {type: typeName});
    if (!exists) {
      exists = {type: typeName};
      this.formHandler.push(exists);
    }
    return exists;
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

