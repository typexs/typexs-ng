import {Component, ComponentFactoryResolver, Inject, Injector, Input, OnInit} from '@angular/core';
import {DataContainer} from 'typexs-schema/libs/DataContainer';
import {FormComponent} from '../../libs/form/decorators/FormComponent';
import {AbstractFormComponent} from './AbstractFormComponent';
import {xFormService} from './xform.service';

@FormComponent('form')
@Component({
  selector: 'xform',
  templateUrl: './xform.component.html',
})
export class xFormComponent extends AbstractFormComponent implements OnInit {



  @Input()
  name: string;

  @Input()
  instance: any;


  constructor(@Inject(xFormService) private formService: xFormService,
              @Inject(Injector) protected injector: Injector,
              @Inject(ComponentFactoryResolver) protected   r: ComponentFactoryResolver) {
    super(injector, r);
  }


  ngOnInit() {
    console.log(this.name);

    // TODO instance must be present
    this.data = new DataContainer(this.instance);
    this.elem = this.formService.get(this.name, this.instance);

    // TODO restructure form
    this.build(this.elem);
  }


  async onSubmit() {
    await this.data.validate();
  }


}

