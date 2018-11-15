import {Component, Input} from '@angular/core';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {AbstractFormComponent} from '../../libs/forms/AbstractFormComponent';
import {Checkbox} from '../../libs/forms/elements';


@ViewComponent('checkbox')
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
