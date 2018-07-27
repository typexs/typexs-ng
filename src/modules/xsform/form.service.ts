import {Injectable} from '@angular/core';
import {Registry} from 'typexs-schema/libs/Registry';
import {Form} from './elements';
import {FormBuilder} from './FormBuilder';


@Injectable()
export class FormService {

  cache: any = {};

  get(name: string, instance: any): Form {
    // TODO lookup for form modifications
    let entityDef = Registry.getEntityDefFor(instance);
    let builder2 = new FormBuilder();
    return builder2.buildFromEntity(entityDef);
  }

}
