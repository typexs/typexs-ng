import {Component, Input} from '@angular/core';
import {FormComp} from '../../libs/form/decorators/FormComp';
import {Checkbox} from '../../libs/form/elements/Checkbox';
import {AbstractFormComponent} from './AbstractFormComponent';
import {Select} from '../../libs/form/elements';
import * as _ from 'lodash';

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
export class SelectComponent extends AbstractFormComponent<Select> {

  cachedOptions: Option[] = null;

  get options() {
    if (!this.cachedOptions) {
      this.cachedOptions = [];
      if (_.isArray(this.elem.enum)) {
        this.elem.enum.forEach(e => {
          let o = new Option();
          if (_.isString(e)) {
            o.label = o.value = e;
          } else {
            throw new Error('not found');
          }
          this.cachedOptions.push(o);
        });
      }
    }
    return this.cachedOptions;
  }

}
