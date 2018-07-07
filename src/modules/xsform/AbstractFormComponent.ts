import {ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {FormRegistry} from '../../libs/form/FormRegistry';
import {NoFormTypeDefinedError} from '../../libs/form/exceptions/NoFormTypeDefinedError';
import {DataContainer} from 'typexs-schema/libs/DataContainer';
import {FormObject} from '../../libs/form/FormObject';
import {get as _get, set as _set, isEmpty as _isEmpty, filter as _filter} from 'lodash';
import {PropertyDef} from 'typexs-schema/libs/PropertyDef';
import {Name} from './Name';



export abstract class AbstractFormComponent<T extends FormObject> {

  static _inc: number = 0;

  naming: Name;

  elem: T;

  data: DataContainer<any>;

//  dataPath: string;

  inc: number = 0;

//  idx: number = -1;


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


  setData(elem: T, parent: Name, idx: number = -1) {
    this.setFormObject(elem);
    if (parent) {
      this.naming = parent.child(elem.name, idx);
    } else {
      this.naming = new Name();
      if (elem.getBinding() instanceof PropertyDef) {
        this.naming.name = elem.name;
        this.naming.idx = idx;
      }
    }
  }


  get value() {
    let path = this.naming.path();
    return _get(this.data.instance, path, null);
  }


  set value(v: any) {
    let path = this.naming.path();
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
          instance.setData(formObject, this.naming);
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
