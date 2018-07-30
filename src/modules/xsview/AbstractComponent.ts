import {ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {Context} from '../../modules/xsform/Context';
import {NoFormTypeDefinedError} from '../../libs/exceptions/NoFormTypeDefinedError';
import {TreeObject} from './TreeObject';
import {ContentComponentRegistry} from './ContentComponentRegistry';



export abstract class AbstractComponent<T extends TreeObject> {

  context: Context;

  elem: T;

  @ViewChild('content', {read: ViewContainerRef}) vc: ViewContainerRef;


  constructor(@Inject(Injector) public injector: Injector,
              @Inject(ComponentFactoryResolver) public r: ComponentFactoryResolver) {
  }

  protected setElem(elem: T) {
    this.elem = elem;
  }


  buildSingle(content: T) {
    const handle = ContentComponentRegistry.$().getOrCreateDef(content.type);
    if (handle && handle.component) {
      if (this.vc) {
        const factory = this.r.resolveComponentFactory(<any>handle.component);
        const ref = this.vc.createComponent(factory);
        const instance = <AbstractComponent<T>>ref.instance;
        instance.elem = content;

        /*
        instance.data = this.data;
        instance.setData(formObject, this.context);
*/
        if (instance.build) {
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
