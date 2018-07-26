import {Component, Input} from '@angular/core';
import {Checkbox} from '../../libs/form/elements/Checkbox';
import {AbstractFormComponent} from './AbstractFormComponent';
import {Radio} from '../../libs/form/elements/Radio';
import {ContentComponent} from '../../libs/content/decorators/ContentComponent';


@ContentComponent('radio')
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
