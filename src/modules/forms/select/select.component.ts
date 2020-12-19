import {Component, OnInit} from '@angular/core';

import * as _ from 'lodash';
import {SelectHandle} from '../../../libs/forms/elements';
import {ViewComponent} from '../../../libs/views/decorators/ViewComponent';
import {Option} from '../../../libs/forms/elements/Option';
import {ISelectOption} from './../libs/ISelectOption';
import {EnumHandle} from '../libs/EnumHandle';
import {AbstractFormComponent} from '../component/AbstractFormComponent';


@ViewComponent('select')
@Component({
  selector: 'txs-select',
  templateUrl: './select.component.html',
})
export class SelectComponent extends AbstractFormComponent<SelectHandle> implements OnInit {


  get supportsMultiple(): boolean {
    return this.getInstance().isMultiple();
  }



  cachedOptions: Option[] = [];

  static checkAndCreateOption(e: any) {
    const o = new Option();
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

  ngOnInit() {
    this.cachedOptions = [];
    this.loadOptions();
  }

  selectFirst(o: Option) {
    if (!this.supportsMultiple && !this._value) {
      // TODO default value?
      this.value = o.value;
    }
  }


  addCacheOption(iso: ISelectOption) {
    const o = SelectComponent.checkAndCreateOption(iso);
    this.selectFirst(o);
    this.cachedOptions.push(o);
  }

  loadOptions() {

    const enumHandle = new EnumHandle(this.injector, this.getInstance());
    const enums = enumHandle.retrieveEnum(this.data, this.context.parent);

    if (enums) {

      if (!_.isArray(enums)) {
        enums.subscribe((e: ISelectOption[]) => {
          if (e) {
            this.cachedOptions = [];
            e.forEach(_e => {
              this.addCacheOption(_e);
            });
          }
        });
      } else {
        enums.forEach(e => {
          this.addCacheOption(e);
        });
      }
    }
  }
}
