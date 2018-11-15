import {Component} from '@angular/core';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {AbstractFormComponent} from '../../libs/forms/AbstractFormComponent';
import {Input} from '../../libs/forms/elements';



@ViewComponent('input')
@Component({
  selector: 'xinput',
  templateUrl: './input.component.html',
})
export class InputComponent extends AbstractFormComponent<Input>/* implements OnInit, OnChanges */ {

  get type(){
    return this.elem.variant;
  }




}
