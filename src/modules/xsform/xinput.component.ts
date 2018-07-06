import {Component, Input} from '@angular/core';
import {DataContainer} from 'typexs-schema/libs/DataContainer';
import {FormComponent} from '../../libs/form/decorators/FormComponent';
import {Input as xInput} from '../../libs/form/elements';
import {AbstractFormComponent} from './AbstractFormComponent';


@FormComponent('input')
@Component({
  selector: 'xinput',
  templateUrl: './xinput.component.html',
})
export class xInputComponent extends AbstractFormComponent/* implements OnInit, OnChanges */ {


  @Input()
  type: string = 'text';

  @Input()
  name: string = 'noname';





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
