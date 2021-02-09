import {Injectable} from '@angular/core';

import {Form} from '../../libs/forms/elements';
import {FormBuilder} from '../../libs/forms/FormBuilder';
import {ILookupRegistry} from 'commons-schema-api/browser';
import {ComponentRegistryService} from '../base/component/component-registry.service';


@Injectable()
export class FormService {

  cache: any = {};

  constructor(private componentRegistry: ComponentRegistryService) {
  }

  get(name: string, instance: any, registry: ILookupRegistry): Form {
    // TODO lookup for form modifications
    const entityDef = registry.getEntityRefFor(instance);
    const builder2 = new FormBuilder(this.componentRegistry.registry);
    return builder2.buildFromEntity(entityDef);
  }

}
