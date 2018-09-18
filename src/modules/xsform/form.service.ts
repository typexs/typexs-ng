import {Injectable} from '@angular/core';
import {EntityRegistry} from 'typexs-schema/libs/EntityRegistry';
import {Form} from '../../libs/xsform/elements';
import {FormBuilder} from '../../libs/xsform/FormBuilder';


@Injectable()
export class FormService {

  cache: any = {};

  get(name: string, instance: any): Form {
    // TODO lookup for form modifications
    let entityDef = EntityRegistry.getEntityDefFor(instance);
    let builder2 = new FormBuilder();
    return builder2.buildFromEntity(entityDef);
  }

}
