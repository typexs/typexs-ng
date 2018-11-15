import {Component, Input} from '@angular/core';
import {AbstractFormComponent} from '../../libs/forms/AbstractFormComponent';
import {Radio} from '../../libs/forms/elements/Radio';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';


@ViewComponent('radio')
@Component({
  selector: 'xradio',
  templateUrl: './radio.component.html',
})
export class RadioComponent extends AbstractFormComponent<Radio> {

  on: string = 'Yes';

  off: string = 'No';

  get type() {
    return this.elem.variant;
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
