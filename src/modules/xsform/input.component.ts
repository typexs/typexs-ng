import {Component} from '@angular/core';
import {ViewComponent} from '../../libs/xsview/decorators/ViewComponent';
import {AbstractFormComponent} from '../../libs/xsform/AbstractFormComponent';
import {Input} from '../../libs/xsform/elements';



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
