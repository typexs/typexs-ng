import {cloneDeep, find} from 'lodash';
import {Component, ComponentFactoryResolver, EventEmitter, Injector, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormService} from './form.service';
import {ViewComponent} from '@typexs/ng';
import {Form} from '@typexs/ng';
import {MessageChannel} from '@typexs/base-ng';
import {IMessage} from '@typexs/base-ng';
import {IFormOptions} from './IFormOptions';
import {AbstractFormComponent} from './component/AbstractFormComponent';
import {EntityResolverService} from '@typexs/base-ng';
import {EntityRegistry} from '@typexs/schema/libs/EntityRegistry';
import {DataContainer} from '@typexs/base';


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

  constructor(private formService: FormService,
              public injector: Injector,
              public r: ComponentFactoryResolver,
              private resolver: EntityResolverService
  ) {
    super(injector, r);
    // TODO ...
    // if (!this.registry) {
    //   this.registry = resolver.
    // }
  }


  ngOnInit() {
    this.original = cloneDeep(this.instance);
    this.reset();
  }


  reset() {
    // TODO instance must be present
    super.reset();

    if (!this.registry) {
      const service = this.resolver.getServiceFor(this.instance);
      if (service) {
        this.registry = service.getRegistry();
      } else {
        this.registry = EntityRegistry.$();
      }
    }
    console.log(this.instance);
    this.data = new DataContainer(this.instance, this.registry);
    console.log(this.data);
    this.formObject = this.formService.get(this.formName, this.instance, this.registry);
    console.log(this.formObject);
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

    this.instance = cloneDeep(this.original);

    this.reset();
    this.ngReset.emit({event: $event, data: this.data});
    return false;
  }


  async onButton(key: string, $event: Event): Promise<boolean> {
    const btn = find(this.options.buttons, b => b.key === key);
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

