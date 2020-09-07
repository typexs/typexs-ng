import {Component} from '@angular/core';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {AbstractFormComponent} from '../../libs/forms/AbstractFormComponent';
import {InputHandle} from '../../libs/forms/elements';


@ViewComponent('input')
@Component({
  selector: 'txs-input',
  templateUrl: './input.component.html',
})
export class InputComponent extends AbstractFormComponent<InputHandle>/* implements OnInit, OnChanges */ {

  get type() {
    return this.elem.variant;
  }


}
