import {AfterViewInit, Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DataContainer} from '../../libs/xschema/DataContainer';
import {XSRegistry} from '../../libs/xschema/XSRegistry';
import {XSEntityDef} from '../../libs/xschema/XSEntityDef';
import {XSPropertyDef} from '../../libs/xschema/XSPropertyDef';
import {XInputComponent} from './xinput.component';
import * as _ from 'lodash';


@Component({
  selector: 'xform',
  templateUrl: './xform.component.html',
})
export class XFormComponent implements OnInit {

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
    // TODO instance must be present
    this.dc = new DataContainer(this.instance);
    let xsDef = XSRegistry.getEntityDefFor(this.instance);
    let form = new Form(name);
    form.parse(xsDef);


    // TODO restructure form
    this.build(form);

  }


  build(form:Form) {
    form.elements.forEach(elem => {
      let def = _.find(FormElemRegistry.registry,{type:elem.type});
      let factory = this.r.resolveComponentFactory(def.component);
      let ref = this.vc.createComponent(factory);
      ref.instance.element = elem;
      ref.instance.data = this.dc;
    })
    /*
      let xsDef = XSRegistry.getEntityDefFor(this.user);

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


export class Form {

  name: string;

  elements: FormElem[] = [];

  constructor(name: string) {
    this.name = name;
  }

  parse(xsEntityDef: XSEntityDef) {

    let xsProps = xsEntityDef.getPropertyDefs();
    console.log(xsEntityDef, xsProps);

    xsProps.forEach(_x => {
      // TODO analyse
      let x = new InputElem();
      x.parse(_x);
      this.elements.push(x);
    });


    /*
    let factory = this.r.resolveComponentFactory(XInputComponent);
    xsProps.forEach(xsProp => {

      let ref = this.vc.createComponent(factory);
      ref.instance.name = xsProp.name;
      ref.instance.data = this.workContainer;
    })
    */
  }

}


export class XFormBuilder {

}


export abstract class FormElem {
  readonly type: string;

  property: XSPropertyDef;

  name: string;

  label: string;

  parse(prop: XSPropertyDef) {
    this.property = prop;
    this.name = prop.name;
    this.label = this.name;

  }

}


export class InputElem extends FormElem {
  type = 'input'
}


export class FormElemRegistry {
  static registry = [
    {type: 'input', component: XInputComponent}
  ];


}
