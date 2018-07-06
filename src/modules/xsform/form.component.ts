import {Component, ComponentFactoryResolver, Inject, Injector, Input, OnInit} from '@angular/core';
import {DataContainer} from 'typexs-schema/libs/DataContainer';
import {FormComp} from '../../libs/form/decorators/FormComp';
import {AbstractFormComponent} from './AbstractFormComponent';
import {FormService} from './form.service';
import {Form} from '../../libs/form/elements/Form';

@FormComp('form')
@Component({
  selector: 'xform',
  templateUrl: './form.component.html',
})
export class FormComponent extends AbstractFormComponent<Form> implements OnInit {


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
    console.log(this.formName);

    // TODO instance must be present
    this.data = new DataContainer(this.instance);
    this.elem = this.formService.get(this.formName, this.instance);

    // TODO restructure form
    this.build(this.elem);
  }


  async onSubmit() {
    await this.data.validate();
    console.log(this.data)
  }


}

