import {ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {FormRegistry} from '../../libs/form/FormRegistry';
import {NoFormTypeDefinedError} from '../../libs/form/exceptions/NoFormTypeDefinedError';
import {DataContainer} from 'typexs-schema/libs/DataContainer';
import {FormObject} from '../../libs/form/FormObject';
import {get as _get, set as _set} from 'lodash';
import {PropertyDef} from 'typexs-schema/libs/PropertyDef';
import {Context} from './Context';


export abstract class AbstractFormComponent<T extends FormObject> {

  static _inc: number = 0;

  context: Context;

  elem: T;

  data: DataContainer<any>;

  inc: number = 0;


  @ViewChild('content', {read: ViewContainerRef}) vc: ViewContainerRef;


  constructor(@Inject(Injector) protected injector: Injector,
              @Inject(ComponentFactoryResolver) protected r: ComponentFactoryResolver) {
    this.inc = AbstractFormComponent._inc++;
  }


  get id() {
    return this.elem.id;
  }


  get name() {
    return this.elem.name;
  }


  get label() {
    return this.elem.label;
  }


  get labelDisplay() {
    return  this.context.get('labelDisplay','top');
  }


  get help() {
    return this.elem.help;
  }


  get isReadOnly() {
    return this.elem.readonly;
  }


  get isValid() {
    return this.data.checked(this.name) && this.data.valid(this.name);
  }


  protected setFormObject(elem: T) {
    this.elem = elem;
  }


  setData(elem: T, parent: Context, idx: number = -1) {
    this.setFormObject(elem);
    if (parent) {
      this.context = parent.child(elem.name, idx);
    } else {
      this.context = new Context();
      if (elem.getBinding() instanceof PropertyDef) {
        this.context.name = elem.name;
        this.context.idx = idx;
      }
    }
  }


  get value() {
    let path = this.context.path();
    return _get(this.data.instance, path, null);
  }


  set value(v: any) {
    let path = this.context.path();
    _set(this.data.instance, path, v);
  }


  build(form: FormObject) {
    form.getChildren().forEach(formObject => {
      let handle = FormRegistry.$().getOrCreateDef(formObject.type);
      if (handle && handle.component) {
        if (this.vc) {
          let factory = this.r.resolveComponentFactory(<any>handle.component);
          let ref = this.vc.createComponent(factory);
          let instance = <AbstractFormComponent<any>>ref.instance;
          instance.data = this.data;
          instance.setData(formObject, this.context);
          instance.build(formObject);
        } else {
          console.error('No view content setted');
        }
      } else {
        throw new NoFormTypeDefinedError(formObject.type);
      }
    });
  }

}
