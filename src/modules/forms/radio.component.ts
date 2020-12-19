import {Component, Input} from '@angular/core';
import {RadioHandle} from '../../libs/forms/elements/RadioHandle';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {AbstractFormComponent} from './component/AbstractFormComponent';


@ViewComponent('radio')
@Component({
  selector: 'txs-radio',
  templateUrl: './radio.component.html',
})
export class RadioComponent extends AbstractFormComponent<RadioHandle> {

  on: string = 'Yes';

  off: string = 'No';

  get type() {
    return this.getInstance().variant;
  }

  get isChecked() {
    return this.data.instance[this.name];
  }

  set isChecked(value: boolean) {
    if (value) {
      this.data.instance[this.name] = true;
    } else {
      this.data.instance[this.name] = false;
    }
  }
}
