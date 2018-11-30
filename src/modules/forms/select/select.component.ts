import {Component, OnInit} from '@angular/core';

import * as _ from 'lodash';
import {AbstractFormComponent} from '../../../libs/forms/AbstractFormComponent';
import {Select} from '../../../libs/forms/elements';
import {ViewComponent} from '../../../libs/views/decorators/ViewComponent';
import {Option} from '../../../libs/forms/elements/Option';
import {ISelectOption} from './../libs/ISelectOption';
import {EnumHandle} from '../libs/EnumHandle';


@ViewComponent('select')
@Component({
  selector: 'xselect',
  templateUrl: './select.component.html',
})
export class SelectComponent extends AbstractFormComponent<Select> implements OnInit {

  cachedOptions: Option[] = [];


  get supportsMultiple(): boolean {
    return this.elem.isMultiple();
  }

  ngOnInit() {
    this.cachedOptions = [];
    this.loadOptions();
  }

  static checkAndCreateOption(e: any) {
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
    let enumHandle = new EnumHandle(this.injector, this.elem);
    let enums = enumHandle.retrieveEnum(this.data, this.context.parent);

    if (enums) {

      if (!_.isArray(enums)) {
        enums.subscribe((e: ISelectOption[]) => {
          if (e) {
            e.forEach(_e => {
              this.cachedOptions.push(SelectComponent.checkAndCreateOption(_e));
            });
          }
        });
      } else {
        enums.forEach(e => {
          this.cachedOptions.push(SelectComponent.checkAndCreateOption(e));
        });
      }
    }
  }
}
