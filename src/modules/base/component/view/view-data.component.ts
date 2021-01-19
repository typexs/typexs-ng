import * as _ from 'lodash';
import {Component, ComponentFactoryResolver, Inject, Injector, Input, OnInit} from '@angular/core';
import {TreeObject} from '../../../../libs/views/TreeObject';
import {AbstractComponent} from '../AbstractComponent';
import {C_DEFAULT} from '../../constants';
import {IComponentBinding} from '../../../../libs/views/IComponentBinding';
import {ComponentRegistryService} from '../component-registry.service';
import {ClassUtils} from 'commons-base/browser';


@Component({
  selector: 'txs-view',
  templateUrl: 'view-data.component.html',
  styleUrls: ['./view-data.component.scss']
  // host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  // outputs: ['ngSubmit'],
})
export class ViewDataComponent<T extends TreeObject> extends AbstractComponent<T> implements OnInit {

  private _build = false;

  inputKeys = ['options'];

  private _mode: string = C_DEFAULT;

  viewModes: IComponentBinding[] = null;

  @Input()
  allowViewModeSwitch: boolean = false;

  @Input()
  options: any;

  @Input()
  set mode(mode: string) {
    this.setViewContext(mode);
  }

  get mode() {
    return this.getViewContext();
  }


  @Input()
  set instance(value: any) {
    this.setInstance(value);
    this._build = false;
    this.__build();
  }

  get instance(): any {
    return this.getInstance();
  }

  constructor(
    @Inject(Injector) public injector: Injector,
    @Inject(ComponentFactoryResolver) public r: ComponentFactoryResolver,
    private componentRegistry: ComponentRegistryService) {
    super(injector, r);
  }

  getViewContext(): string {
    return this._mode;
  }

  setViewContext(context: string) {
    this._mode = context;
  }

  switchLayout(viewMode: IComponentBinding) {
    this.mode = viewMode.extra.context;
    return this.buildComponent(viewMode.component as any, this.instance);
  }

  ngOnInit() {
    this.__build();
  }

  private __build() {
    if (!this._build && this.instance) {
      if (this.allowViewModeSwitch) {
        const className = ClassUtils.getClassName(this.instance);
        this.viewModes = this.componentRegistry.registry
          .forHandle(className)
          .filter(x => _.get(x, 'extra.context', false)
          );
      }
      this.getViewContainerRef().clear();
      this.buildSelf(this.instance);
      this._build = true;
    }
  }
}

