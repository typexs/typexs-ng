import {Component, Input} from '@angular/core';
import {DataContainer} from 'typexs-schema/libs/DataContainer';
import {FormComponent} from '../../libs/form/decorators/FormComponent';
import {Input as xInput} from '../../libs/form/elements';


@FormComponent('input')
@Component({
  selector: 'xinput',
  templateUrl: './xinput.component.html',
})
export class xInputComponent /* implements OnInit, OnChanges */ {

  elem: xInput;

  @Input()
  type: string = 'text';

  @Input()
  name: string = 'noname';


  data: DataContainer<any>;

  /*
  value: any;

  ngOnInit(){
    Object.defineProperty(this, 'value',{
      get: () => {return this.data.instance[this.name] },
      set: (data:any) => {this.data.instance[this.name] = data}
    })

  }
  */

}
