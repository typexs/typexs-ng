import {Component, Input} from '@angular/core';
import {FormComp} from '../../libs/form/decorators/FormComp';
import {Input as xInput} from '../../libs/form/elements/Input';
import {AbstractFormComponent} from './AbstractFormComponent';


@FormComp('input')
@Component({
  selector: 'xinput',
  templateUrl: './input.component.html',
})
export class InputComponent extends AbstractFormComponent<xInput>/* implements OnInit, OnChanges */ {

  get type(){
    return this.elem.variant;
  }




}
