import {Component, Input} from '@angular/core';
import {AbstractFormComponent} from './AbstractFormComponent';
import {ViewComponent} from '../xsview/decorators/ViewComponent';
import {Checkbox} from './elements';


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
