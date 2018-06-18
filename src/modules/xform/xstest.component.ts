


import {Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {XSUserTest} from './xstest.defs';

import {XInputComponent} from './xinput.component';
import {DataContainer} from '../../libs/xschema/DataContainer';


@Component({
  selector: 'xstest',
  templateUrl: 'xstest.component.html',

})
export class XSTestComponent implements OnInit{

  user:any;




  ngOnInit(){
    this.user = new XSUserTest();

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

}
