import {Injectable} from '@angular/core';
import {FormBuilder} from '../../libs/form/FormBuilder';
import {Registry} from 'typexs-schema/libs/Registry';
import {Form} from '../../libs/form/elements';


@Injectable()
export class xFormService {

  cache: any = {};

  get(name: string, instance: any): Form {
    // TODO lookup for form modifications
    let entityDef = Registry.getEntityDefFor(instance);
    let builder2 = new FormBuilder();
    return builder2.buildFromXsEntity(entityDef);
  }

}
