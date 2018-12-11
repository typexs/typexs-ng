import * as _ from 'lodash';
import {Component} from '@angular/core';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {AbstractFormComponent} from '../../libs/forms/AbstractFormComponent';
import {Checkbox} from '../../libs/forms/elements';


@ViewComponent('checkbox')
@Component({
  selector: 'xcheckbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends AbstractFormComponent<Checkbox> {

  get type() {
    return this.elem.variant;
  }


  // TODO checked as boolean or value?
  get isChecked() {
    let value = this.getValue();

    if (this.elem.isMultiple()) {
      if (!value) {
        value = [];
      }
      return value.indexOf(this.defaultValue) != -1;
    }
    return value;
  }


  set isChecked(checked: boolean) {
    let datatype = this.elem.getBinding().dataType;
    if (this.elem.isMultiple()) {
      let value = this.getValue();
      if (!value) {
        value = [];
      }
      if (value.indexOf(this.defaultValue) == -1) {
        value.push(this.defaultValue);
      } else {
        _.remove(value, v => this.defaultValue == v);
      }
      this.setValue(value);
    } else {

      if (datatype == 'boolean') {
        let v = this.getValue();
        if(_.isBoolean(v)){
          this.setValue(!v);
        }else{
          this.setValue(true);
        }
      } else if (datatype == 'string') {
        if (checked) {
          this.setValue(this.defaultValue);
        } else {
          this.setValue(null);
        }
      }
    }
  }
}
