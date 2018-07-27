import {Component, Input} from '@angular/core';
import {Input as xInput} from './elements/Input';
import {AbstractFormComponent} from './AbstractFormComponent';
import {ViewComponent} from '../xsview/decorators/ViewComponent';



@ViewComponent('input')
@Component({
  selector: 'xinput',
  templateUrl: './input.component.html',
})
export class InputComponent extends AbstractFormComponent<xInput>/* implements OnInit, OnChanges */ {

  get type(){
    return this.elem.variant;
  }




}
