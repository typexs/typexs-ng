import {Injectable} from '@angular/core';

import {Form} from '../../libs/forms/elements';
import {FormBuilder} from '../../libs/forms/FormBuilder';
import {ILookupRegistry} from 'commons-schema-api/browser';


@Injectable()
export class FormService {

  cache: any = {};

  get(name: string, instance: any, registry:ILookupRegistry): Form {
    // TODO lookup for form modifications
    let entityDef = registry.getEntityRefFor(instance);
    let builder2 = new FormBuilder();
    return builder2.buildFromEntity(entityDef);
  }

}
