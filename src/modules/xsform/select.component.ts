import {Component, OnInit} from '@angular/core';

import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {AbstractFormComponent} from '../../libs/xsform/AbstractFormComponent';
import {Select} from '../../libs/xsform/elements';
import {ViewComponent} from '../../libs/xsview/decorators/ViewComponent';
import {Option} from '../../libs/xsform/elements/Option';
import {ISelectOptionsService} from './ISelectOptionsService';


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

  loadOptions() {
    let enums = this.retrieveEnum();

    if (enums) {
      if (enums instanceof Observable) {
        enums.subscribe(e => {
          let o = new Option();
          if (_.isString(e)) {
            o.label = o.value = e;
          } else if (_.has(e, 'label') || _.has(e, 'value')) {
            o.label = _.get(e, 'label', _.get(e, 'value'));
            o.value = _.get(e, 'value', _.get(e, 'label'));
          } else {
            throw new Error('not found');
          }
          this.cachedOptions.push(o);
        });
      } else {
        enums.forEach(e => {
          let o = new Option();
          if (_.isString(e)) {
            o.label = o.value = e;
          } else if (_.has(e, 'label') || _.has(e, 'value')) {
            o.label = _.get(e, 'label', _.get(e, 'value'));
            o.value = _.get(e, 'value', _.get(e, 'label'));
          } else {
            throw new Error('not found');
          }
          this.cachedOptions.push(o);
        });
      }
    }
  }


  retrieveEnum(): any[] | Observable<any[]> {
    if (_.isArray(this.elem.enum)) {
      return this.elem.enum;
    } else if (_.isFunction(this.elem.enum)) {
      return (<ISelectOptionsService>this.injector.get(this.elem.enum)).options(this.elem.getBinding());
    } else if (_.isString(this.elem.enum)) {
      let error = null;
      try {
        // maybe is string injector
        return (<ISelectOptionsService>this.injector.get(this.elem.enum)).options(this.elem.getBinding());
      } catch (e) {
        error = e;
      }

      if (_.isNull(error)) {
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
      }
    }
    return [];
  }
}
