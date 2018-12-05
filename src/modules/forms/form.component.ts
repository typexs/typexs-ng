import {Component, ComponentFactoryResolver, EventEmitter, Inject, Injector, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DataContainer} from '@typexs/schema/libs/DataContainer';
import {FormService} from './form.service';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {AbstractFormComponent} from '../../libs/forms/AbstractFormComponent';
import {Form} from '../../libs/forms/elements';
import {MessageChannel} from '../system/messages/MessageChannel';
import {IMessage} from '../system/messages/IMessage';


@ViewComponent('form')
@Component({
  selector: 'xform',
  templateUrl: './form.component.html',
  //host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  //outputs: ['ngSubmit'],
})
export class FormComponent extends AbstractFormComponent<Form> implements OnInit, OnDestroy {

  @Output()
  ngSubmit = new EventEmitter();

  @Input()
  channel: MessageChannel<IMessage>;


  @Input()
  formName: string;

  @Input()
  instance: any;


  constructor(@Inject(FormService)
              private formService: FormService,
              @Inject(Injector)
              public injector: Injector,
              @Inject(ComponentFactoryResolver)
              public r: ComponentFactoryResolver) {
    super(injector, r);
  }


  ngOnInit() {
    // TODO instance must be present
    this.data = new DataContainer(this.instance);
    this.elem = this.formService.get(this.formName, this.instance);
    // TODO restructure form
    this.build(this.elem);
  }

  ngOnDestroy(): void {
  }


  async onSubmit($event: Event): Promise<boolean> {
    if(this.channel){
      // clear
      this.channel.publish(null);
    }
    await this.data.validate();
    this.ngSubmit.emit({event: $event, data: this.data});
    return false;
  }


}

