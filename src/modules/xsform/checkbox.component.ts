import {Component, Input} from '@angular/core';
import {FormComp} from '../../libs/form/decorators/FormComp';
import {Checkbox } from '../../libs/form/elements/Checkbox';
import {AbstractFormComponent} from './AbstractFormComponent';


@FormComp('checkbox')
@Component({
  selector: 'xcheckbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends AbstractFormComponent<Checkbox> {

  get type(){
    return this.elem.variant;
  }


  get isChecked(){
    return this.data.instance[this.name];
  }

  set isChecked(value:boolean){
    if(value){
      this.data.instance[this.name] = true;
    }else{
      this.data.instance[this.name] = false;
    }
  }
}
