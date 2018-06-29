import {Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';


import {XsForm} from '../../libs/xsform/xsForm';
import {PropertyDef, PropertyDef as XsPropertyDef, EntityDef as XsEntityDef,
  Registry as XsRegistry,
  DataContainer
} from 'typexs-schema';


@Component({
  selector: 'xform',
  templateUrl: './xform.component.html',
})
export class XFormComponent implements OnInit {

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
  ngOnInit(){
    console.log(this.name);
    // TODO instance must be present
    this.dc = new DataContainer(this.instance);



    let xsDef = XsRegistry.getEntityDefFor(this.instance);
    let form = new XsForm();
    //form.parse(xsDef);


    // TODO restructure form
    this.build(form);

  }


  build(form:XsForm<any>) {
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

