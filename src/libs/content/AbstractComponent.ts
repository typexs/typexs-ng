import {ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {ContentComponentRegistry} from './ContentComponentRegistry';
import {NoFormTypeDefinedError} from '../exceptions/NoFormTypeDefinedError';
import {TreeObject} from './TreeObject';
import {Context} from '../../modules/xsform/Context';


export abstract class AbstractComponent<T extends TreeObject> {

  context: Context;

  elem: T;

  @ViewChild('content', {read: ViewContainerRef}) vc: ViewContainerRef;


  constructor(@Inject(Injector) protected injector: Injector,
              @Inject(ComponentFactoryResolver) protected r: ComponentFactoryResolver) {

  }

  protected setElem(elem: T) {
    this.elem = elem;
  }



  buildSingle(content: T){
    let handle = ContentComponentRegistry.$().getOrCreateDef(content.type);
    if (handle && handle.component) {
      if (this.vc) {
        let factory = this.r.resolveComponentFactory(<any>handle.component);
        let ref = this.vc.createComponent(factory);
        let instance = <AbstractComponent<T>>ref.instance;
        instance.elem = content;

        /*
        instance.data = this.data;
        instance.setData(formObject, this.context);
*/
        if(instance.build){
          instance.build(content);
        }

      } else {
        console.error('No view content setted');
      }
    } else {
      throw new NoFormTypeDefinedError(content.type);
    }
  }


  build(content: T) {
    content.getChildren().forEach(contentObject => {
      this.buildSingle(<T>contentObject);
    });
  }

}
