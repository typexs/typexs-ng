
import {Observable} from 'rxjs/Observable';
import {ISelectOptionsService} from './ISelectOptionsService';
import {ISelectOption} from './ISelectOption';
import * as _ from 'lodash';
import {Injector} from '@angular/core';
import {AbstractFormComponent} from '../../../libs/forms/AbstractFormComponent';

export class EnumComponentHandle {

  comp: AbstractFormComponent<any>;
  
  injector: Injector;

  constructor(comp: AbstractFormComponent<any>){
    this.comp = comp;
    this.injector = comp.injector;
  }

  getElement(){
    return this.comp.elem;
  }

  getData(){
    return this.comp.data;
  }

  getContext(){
    return this.comp.context;
  }

  retrieveEnum(): any[] | Observable<ISelectOption[]> {
    if (_.isArray(this.getElement().enum)) {
      return this.getElement().enum;
    } else if (_.isFunction(this.getElement().enum)) {
      let service = (<ISelectOptionsService>this.injector.get(this.getElement().enum));
      return service.options(this.getElement().getBinding());
    } else if (_.isString(this.getElement().enum)) {
      let error = null;
      let observer = null;
      try {
        // maybe is string injector
        observer =  (<ISelectOptionsService>this.injector.get(this.getElement().enum));
      } catch (e) {
        error = e;
      }

      if (!_.isNull(error)) {

        // check if an entry with the propertyname exists
        let lookupPath: string | string[] = [];
        if (this.getContext().parent) {
          lookupPath.push(this.getContext().parent.path());
        }
        lookupPath.push(this.getElement().enum);
        lookupPath = (<string[]>lookupPath).join('.');

        if (_.has(this.getData().instance, lookupPath)) {
          // TODO observe if property is changed, if it does then reset enum
          return _.get(this.getData().instance, lookupPath, []);
        } else {
          throw new Error('not found enum reference');
        }
      }else{
        return observer.options(this.getElement().getBinding());
      }
    }
    return [];
  }

}
