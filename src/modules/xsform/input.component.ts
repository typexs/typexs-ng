import {Component, Input} from '@angular/core';
import {Input as xInput} from '../../libs/form/elements/Input';
import {AbstractFormComponent} from './AbstractFormComponent';
import {ContentComponent} from '../../libs/content/decorators/ContentComponent';


@ContentComponent('input')
@Component({
  selector: 'xinput',
  templateUrl: './input.component.html',
})
export class InputComponent extends AbstractFormComponent<xInput>/* implements OnInit, OnChanges */ {

  get type(){
    return this.elem.variant;
  }




}
