import {
  defaults, find, isArray, isEmpty, isFunction, isNumber, intersection,
  get, clone, upperFirst, isNull, keys, values, isString, filter, merge, isPlainObject,
  concat, kebabCase, has, snakeCase, isRegExp, orderBy, remove, first, set
} from 'lodash';
import {Observable} from 'rxjs';


import {Injector} from '@angular/core';

import {FormObject} from '@typexs/ng';
import {Context} from '@typexs/ng';
import {ISelectOption} from './ISelectOption';
import {ISelectOptionsService} from './ISelectOptionsService';
import {DataContainer} from '@typexs/base';
import {EntityOptionsService} from '../../entity/entity-options.service';


export class EnumHandle {

  readonly injector: Injector;

  readonly elem: FormObject;

  constructor(injector: Injector, elem: FormObject) {
    this.elem = elem;
    this.injector = injector;
  }

  getElement() {
    return this.elem;
  }

  retrieveEnum(instance: any, parentContext?: Context): ISelectOption[] | Observable<ISelectOption[]> {
    let _enum = this.getElement().getEnum();
    const isEntityReference = this.getElement().getBinding().isReference() && this.getElement().getBinding().getTargetRef().hasEntityRef();
    if (isEntityReference && !_enum) {
      // set default
      _enum = EntityOptionsService.name; // 'EntityOptionsService';
    }

    if (isArray(_enum)) {
      return _enum;
    } else if (isFunction(_enum)) {
      const service = (<ISelectOptionsService>this.injector.get(_enum));
      return service.options(this.getElement().getBinding());
    } else if (isString(_enum)) {
      let error = null;
      let observer = null;
      try {
        // maybe is string injector
        observer = (<ISelectOptionsService>this.injector.get(_enum));
      } catch (e) {
        error = e;
      }

      if (!isNull(error)) {

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

        if (has(instance, lookupPath)) {
          // TODO observe if property is changed, if it does then reset enum
          return get(instance, lookupPath, []);
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
