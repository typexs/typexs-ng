import {Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';


import {Registry} from 'typexs-schema/libs/Registry';
import {DataContainer} from 'typexs-schema/libs/DataContainer';
import {Form as xForm} from '../../libs/form/elements/Form';
import {FormBuilder} from '../../libs/form/FormBuilder';
import {FormComponent} from '../../libs/form/decorators/FormComponent';

@FormComponent('form')
@Component({
  selector: 'xform',
  templateUrl: './xform.component.html',
})
export class xFormComponent implements OnInit {

  elem: xForm;

  @Input()
  name: string;

  @Input()
  instance: any;

  dc: DataContainer<any>;

  @ViewChild('content', {read: ViewContainerRef}) vc: ViewContainerRef;


  constructor(private injector: Injector,
              private r: ComponentFactoryResolver) {
    /*
    let factory = this.r.resolveComponentFactory(ColorComponent);
    let componentRef = factory.create(injector);
    let view = componentRef.hostView;
    */
  }


  // ngOnInit(){}

  //ngAfterViewInit() {
  ngOnInit() {
    console.log(this.name);
    // TODO instance must be present
    this.dc = new DataContainer(this.instance);


    let entityDef = Registry.getEntityDefFor(this.instance);
    let builder2 = new FormBuilder();
    this.elem = builder2.buildFromXsEntity(entityDef);

    //form.parse(xsDef);

    // TODO restructure form
    this.build(this.elem);
  }


  build(form: xForm) {
    console.log(form);
    /*
    form.elements.forEach(elem => {
      let def = _.find(XsFormRegistry.components,{type:elem.type});
      let factory = this.r.resolveComponentFactory(def.component);
      let ref = this.vc.createComponent(factory);
      ref.instance.element = elem;
      ref.instance.data = this.dc;
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


  async onSubmit() {
    await this.dc.validate();
  }


}

