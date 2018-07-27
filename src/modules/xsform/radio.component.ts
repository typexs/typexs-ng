import {Component, Input} from '@angular/core';
import {AbstractFormComponent} from './AbstractFormComponent';
import {ViewComponent} from '../xsview/decorators/ViewComponent';
import {Radio} from './elements/Radio';


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
