
import * as _ from 'lodash';
import {NoFormHandlerDefinedForTypeError} from './exceptions/NoFormHandlerDefinedForTypeError';


export class FormRegistry {

  /*
    static components = [
      {type: 'input', component: XInputComponent}
    ];
  */
  private static formHandler: IElementDef[] = [];

  static addHandler(typeName: string, klass: Function) {
    this.formHandler.push({type: typeName, handler: klass});
  }

  static createHandler(typeName: string) {
    let handler = _.find(this.formHandler, {type: typeName});
    if (!handler) {
      throw new NoFormHandlerDefinedForTypeError(typeName);
    }
    let obj = Reflect.construct(handler.handler, []);
    obj.type = typeName;
    return obj;
  }

}

