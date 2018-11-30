import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';
import {Injector} from '@angular/core';
import {DataContainer} from '@typexs/schema/libs/DataContainer';
import {FormObject} from '../../../libs/forms/FormObject';
import {Context} from '../../../libs/views/Context';
import {ISelectOption} from './ISelectOption';
import {ISelectOptionsService} from './ISelectOptionsService';


export class EnumHandle {

  injector: Injector;

  elem: FormObject;

  constructor(injector: Injector, elem: FormObject) {
    this.elem = elem;
    this.injector = injector;
  }

  getElement() {
    return this.elem;
  }

  retrieveEnum(instance: any, parentContext?: Context): ISelectOption[] | Observable<ISelectOption[]> {
    if (_.isArray(this.getElement().getEnum())) {
      return this.getElement().getEnum();
    } else if (_.isFunction(this.getElement().getEnum())) {
      let service = (<ISelectOptionsService>this.injector.get(this.getElement().getEnum()));
      return service.options(this.getElement().getBinding());
    } else if (_.isString(this.getElement().getEnum())) {
      let error = null;
      let observer = null;
      try {
        // maybe is string injector
        observer = (<ISelectOptionsService>this.injector.get(this.getElement().getEnum()));
      } catch (e) {
        error = e;
      }

      if (!_.isNull(error)) {

        if (instance instanceof DataContainer) {
          instance = instance.instance;
        }

        // check if an entry with the property name exists
        let lookupPath: string | string[] = [];
        if (parentContext) {
          lookupPath.push(parentContext.path());
        }
        lookupPath.push(this.getElement().getEnum());
        lookupPath = (<string[]>lookupPath).join('.');

        if (_.has(instance, lookupPath)) {
          // TODO observe if property is changed, if it does then reset enum
          return _.get(instance, lookupPath, []);
        } else {
          throw new Error('not found enum reference');
        }
      } else {
        return observer.options(this.getElement().getBinding());
      }
    }
    return [];
  }

}
