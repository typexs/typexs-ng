import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';
import {Injector} from '@angular/core';

import {FormObject} from '../../../libs/forms/FormObject';
import {Context} from '../../../libs/views/Context';
import {ISelectOption} from './ISelectOption';
import {ISelectOptionsService} from './ISelectOptionsService';
import {DataContainer} from '@typexs/base/browser';


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
    let _enum = this.getElement().getEnum();
    if(this.getElement().getBinding().isEntityReference() && !_enum){
      // set default
      _enum = 'EntityOptionsService';
    }

    if (_.isArray(_enum)) {
      return _enum;
    } else if (_.isFunction(_enum)) {
      let service = (<ISelectOptionsService>this.injector.get(_enum));
      return service.options(this.getElement().getBinding());
    } else if (_.isString(_enum)) {
      let error = null;
      let observer = null;
      try {
        // maybe is string injector
        observer = (<ISelectOptionsService>this.injector.get(_enum));
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
        lookupPath.push(_enum);
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
