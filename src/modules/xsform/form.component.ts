import {ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Inject, Injector, Input, OnInit, Output} from '@angular/core';
import {DataContainer} from 'typexs-schema/libs/DataContainer';
import {FormService} from './form.service';
import {ViewComponent} from '../../libs/xsview/decorators/ViewComponent';
import {AbstractFormComponent} from '../../libs/xsform/AbstractFormComponent';
import {Form} from '../../libs/xsform/elements';

@ViewComponent('form')
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
              @Inject(Injector) public injector: Injector,
              @Inject(ComponentFactoryResolver) public r: ComponentFactoryResolver) {
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

