import {Component, ComponentFactoryResolver, EventEmitter, Inject, Injector, Input, OnInit, Output} from '@angular/core';
import {DataContainer} from 'typexs-schema/libs/DataContainer';
import {AbstractFormComponent} from './AbstractFormComponent';
import {FormService} from './form.service';
import {Form} from '../../libs/form/elements/Form';
import {ContentComponent} from '../../libs/content/decorators/ContentComponent';

@ContentComponent('form')
@Component({
  selector: 'xform',
  templateUrl: './form.component.html',
  //host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  //outputs: ['ngSubmit'],
})
export class FormComponent extends AbstractFormComponent<Form> implements OnInit {

  @Output()
  ngSubmit = new EventEmitter();

  @Input()
  formName: string;

  @Input()
  instance: any;


  constructor(@Inject(FormService) private formService: FormService,
              @Inject(Injector) protected injector: Injector,
              @Inject(ComponentFactoryResolver) protected   r: ComponentFactoryResolver) {
    super(injector, r);
  }


  ngOnInit() {

    // TODO instance must be present
    this.data = new DataContainer(this.instance);
    this.elem = this.formService.get(this.formName, this.instance);

    // TODO restructure form
    this.build(this.elem);
  }


  async onSubmit($event: Event): Promise<boolean> {
    await this.data.validate();
    this.ngSubmit.emit({event:$event, data:this.data});
    return false;
  }


}

