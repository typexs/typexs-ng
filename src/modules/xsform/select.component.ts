import {Component, OnInit} from '@angular/core';
import {FormComp} from '../../libs/form/decorators/FormComp';
import {AbstractFormComponent} from './AbstractFormComponent';
import {Select} from '../../libs/form/elements';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';

export class Option {
  value: string = '';
  label: string = '---';
  default: boolean;
}

@FormComp('select')
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


  retrieveEnum(): any[] {
    if (_.isArray(this.elem.enum)) {
      return this.elem.enum;
    } else if (_.isFunction(this.elem.enum)) {
      return this.injector.get(this.elem.enum).get(this.name);
    } else if (_.isString(this.elem.enum)) {
      // check if an entry with the propertyname exists
      if (_.has(this.data.instance, this.elem.enum)) {
        // TODO observe if property is changed, if it does then reset enum
        return _.get(this.data.instance, this.elem.enum, []);
      } else {
        throw new Error('not found enum reference');
      }
    }
    return [];
  }
}
