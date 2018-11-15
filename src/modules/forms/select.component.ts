import {Component, OnInit} from '@angular/core';

import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {AbstractFormComponent} from '../../libs/forms/AbstractFormComponent';
import {Select} from '../../libs/forms/elements';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {Option} from '../../libs/forms/elements/Option';
import {ISelectOption, ISelectOptionsService} from './ISelectOptionsService';
import {Subject} from '../../../node_modules/rxjs';


@ViewComponent('select')
@Component({
  selector: 'xselect',
  templateUrl: './select.component.html',
})
export class SelectComponent extends AbstractFormComponent<Select> implements OnInit {

  cachedOptions: Option[] = [];


  get supportsMultiple(): boolean {
    return this.elem.getBinding().isCollection();
  }

  ngOnInit() {
    this.cachedOptions = [];
    this.loadOptions();
  }

  static checkAndCreateOption(e:any){
    let o = new Option();
    if (_.isString(e)) {
      o.label = o.value = e;
    } else if (_.has(e, 'label') || _.has(e, 'value')) {
      o.label = _.get(e, 'label', _.get(e, 'value'));
      o.value = _.get(e, 'value', _.get(e, 'label'));
    } else {
      throw new Error('not found');
    }
    return o;
  }

  loadOptions() {
    let enums = this.retrieveEnum();

    if (enums) {

      if (!_.isArray(enums)) {
        enums.subscribe((e:ISelectOption[]) => {
          if(e){
            e.forEach(_e => {
              this.cachedOptions.push(SelectComponent.checkAndCreateOption(_e));
            })
          }
        });
      } else {
        enums.forEach(e => {
          this.cachedOptions.push(SelectComponent.checkAndCreateOption(e));
        });
      }
    }
  }


  retrieveEnum(): any[] | Observable<ISelectOption[]> {
    if (_.isArray(this.elem.enum)) {
      return this.elem.enum;
    } else if (_.isFunction(this.elem.enum)) {
      return (<ISelectOptionsService>this.injector.get(this.elem.enum)).options(this.elem.getBinding());
    } else if (_.isString(this.elem.enum)) {
      let error = null;
      let observer = null;
      try {
        // maybe is string injector
        observer =  (<ISelectOptionsService>this.injector.get(this.elem.enum));
      } catch (e) {
        error = e;
      }

      if (!_.isNull(error)) {

        // check if an entry with the propertyname exists
        let lookupPath: string | string[] = [];
        if (this.context.parent) {
          lookupPath.push(this.context.parent.path());
        }
        lookupPath.push(this.elem.enum);
        lookupPath = (<string[]>lookupPath).join('.');

        if (_.has(this.data.instance, lookupPath)) {
          // TODO observe if property is changed, if it does then reset enum
          return _.get(this.data.instance, lookupPath, []);
        } else {
          throw new Error('not found enum reference');
        }
      }else{
        return observer.options(this.elem.getBinding());
      }
    }
    return [];
  }
}
