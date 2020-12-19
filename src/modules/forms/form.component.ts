import * as _ from 'lodash';
import {Component, ComponentFactoryResolver, EventEmitter, Inject, Injector, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {FormService} from './form.service';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {Form} from '../../libs/forms/elements';
import {MessageChannel} from '../base/messages/MessageChannel';
import {IMessage} from '../base/messages/IMessage';
import {IFormOptions} from './IFormOptions';
import {DataContainer} from '@typexs/base/browser';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {AbstractFormComponent} from './component/AbstractFormComponent';


@ViewComponent('form')
@Component({
  selector: 'txs-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
  // host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  // outputs: ['ngSubmit'],
})
export class FormComponent extends AbstractFormComponent<Form> implements OnInit, OnDestroy {

  @Output()
  ngSubmit = new EventEmitter();

  @Output()
  ngReset = new EventEmitter();

  @Output()
  ngButton = new EventEmitter();

  @Input()
  channel: MessageChannel<IMessage>;

  @Input()
  options: IFormOptions = {
    buttons: [
      {
        key: 'submit',
        label: 'Submit',
        type: 'submit'
      },
      {
        key: 'reset',
        label: 'Reset',
        type: 'restore'
      },
    ],
  };


  @Input()
  formName: string;

  @Input()
  instance: any;

  @Input()
  registry: any;

  original: any;

  formObject: any;

  constructor(@Inject(FormService)
              private formService: FormService,
              @Inject(Injector)
              public injector: Injector,
              @Inject(ComponentFactoryResolver)
              public r: ComponentFactoryResolver) {
    super(injector, r);
    // TODO ...
    if (!this.registry) {
      this.registry = EntityRegistry.$();
    }
  }


  ngOnInit() {
    this.original = _.cloneDeep(this.instance);
    this.reset();
  }


  reset() {
    // TODO instance must be present
    super.reset();
    this.data = new DataContainer(this.instance, this.registry);
    this.formObject = this.formService.get(this.formName, this.instance, this.registry);
    // TODO restructure form
    this.build(this.formObject);
  }


  ngOnDestroy(): void {
  }


  async onSubmit($event: Event): Promise<boolean> {
    if ($event.type === 'submit') {
      // ignore mouse event
      if (this.channel) {
        // clear
        this.channel.publish(null);
      }
      await this.data.validate();
      this.ngSubmit.emit({event: $event, data: this.data});

    }
    return false;
  }


  async onReset($event: Event): Promise<boolean> {
    if (this.channel) {
      // clear
      this.channel.publish(null);
    }

    this.instance = _.cloneDeep(this.original);

    this.reset();
    this.ngReset.emit({event: $event, data: this.data});
    return false;
  }


  async onButton(key: string, $event: Event): Promise<boolean> {
    const btn = _.find(this.options.buttons, b => b.key === key);
    if (btn.type === 'submit') {
      return this.onSubmit($event);
    } else if (btn.type === 'restore') {
      return this.onReset($event);
    } else {
      this.ngButton.emit({button: btn, event: $event, data: this.data});
    }
    return false;
  }
}

