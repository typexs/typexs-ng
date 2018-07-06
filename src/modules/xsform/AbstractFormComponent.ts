import {ComponentFactoryResolver, Inject, Injector, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {Form as xForm} from '../../libs/form/elements/Form';
import {FormRegistry} from '../../libs/form/FormRegistry';
import {NoFormTypeDefinedError} from '../../libs/form/exceptions/NoFormTypeDefinedError';
import {DataContainer} from 'typexs-schema/libs/DataContainer';

export abstract class AbstractFormComponent {

  elem: any;

  data: DataContainer<any>;





  @ViewChild('content', {read: ViewContainerRef}) vc: ViewContainerRef;


  constructor(@Inject(Injector) protected injector: Injector,
              @Inject(ComponentFactoryResolver) protected r: ComponentFactoryResolver){
  }

  build(form: xForm) {
    console.log(form);


    form.getChildren().forEach(formObject => {
      let handle = FormRegistry.$().getOrCreateDef(formObject.type);
      if (handle && handle.component) {
        let factory = this.r.resolveComponentFactory(<any>handle.component);
        let ref = this.vc.createComponent(factory);
        let instance = <AbstractFormComponent>ref.instance;
        instance.elem = formObject;
        instance.data = this.data;

        // TODO check if build deeper ...

      } else {
        throw new NoFormTypeDefinedError();
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
