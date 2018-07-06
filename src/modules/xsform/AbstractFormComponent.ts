import {ComponentFactoryResolver, Inject, Injector, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {Form as xForm} from '../../libs/form/elements/Form';
import {FormRegistry} from '../../libs/form/FormRegistry';
import {NoFormTypeDefinedError} from '../../libs/form/exceptions/NoFormTypeDefinedError';
import {DataContainer} from 'typexs-schema/libs/DataContainer';
import {FormObject} from '../../libs/form/FormObject';

export abstract class AbstractFormComponent<T extends FormObject> {

  static inc: number = 0;

  elem: T;

  data: DataContainer<any>;

  idx: number = 0;



  @ViewChild('content', {read: ViewContainerRef}) vc: ViewContainerRef;


  constructor(@Inject(Injector) protected injector: Injector,
              @Inject(ComponentFactoryResolver) protected r: ComponentFactoryResolver) {
    this.idx = AbstractFormComponent.inc++;
  }

  get id(){
    return this.elem.id;
  }

  get name(){
    return this.elem.name;
  }

  get label(){
    return this.elem.label;
  }

  get help(){
    return this.elem.help;
  }

  get isReadOnly(){
    return this.elem.readonly;
  }

  get isValid(){
    return this.data.checked(this.name) && this.data.valid(this.name)
  }

  setFormObject(elem: T) {
    this.elem = elem;
  }

  build(form: xForm) {
    console.log(form);


    form.getChildren().forEach(formObject => {
      let handle = FormRegistry.$().getOrCreateDef(formObject.type);
      if (handle && handle.component) {
        let factory = this.r.resolveComponentFactory(<any>handle.component);
        let ref = this.vc.createComponent(factory);
        let instance = <AbstractFormComponent<any>>ref.instance;
        instance.setFormObject(formObject);
        instance.data = this.data;
        console.log(instance);

        // TODO check if build deeper ...

      } else {
        throw new NoFormTypeDefinedError(formObject.type);
      }
    });


    /*
    form.elements.forEach(elem => {
      let def = _.find(XsFormRegistry.components,{type:elem.type});
      let factory = this.r.resolveComponentFactory(def.component);
    })

    / *
      let xsDef = XsRegistry.getEntityDefFor(this.user);

      let xsProps = xsDef.getPropertyDefs();
      console.log(xsDef,xsProps);

      this.workContainer = new DataContainer(this.user);

      let factory = this.r.resolveComponentFactory(XInputComponent);
      xsProps.forEach(xsProp => {

        let ref = this.vc.createComponent(factory);
        ref.instance.name = xsProp.name;
        ref.instance.data = this.workContainer;
      })
  */

  }

}
