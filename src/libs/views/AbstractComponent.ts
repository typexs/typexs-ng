import * as _ from 'lodash';
import {ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {Context} from './Context';
import {NoFormTypeDefinedError} from '../../libs/exceptions/NoFormTypeDefinedError';
import {TreeObject} from './TreeObject';
import {ContentComponentRegistry} from './ContentComponentRegistry';

const PROP_METADATA = '__prop__metadata__';

export abstract class AbstractComponent<T extends TreeObject> {

  context: Context;

  elem: T;

  @ViewChild('content', {read: ViewContainerRef, static: true})
  vc: ViewContainerRef;


  constructor(@Inject(Injector) public injector: Injector,
              @Inject(ComponentFactoryResolver) public r: ComponentFactoryResolver) {
    this.construct();
  }

  construct() {
  }

  protected setElem(elem: T) {
    this.elem = elem;
  }


  buildSingle(content: T): AbstractComponent<T> {


    const handle = ContentComponentRegistry.$().getOrCreateDef(content.type);
    if (handle && handle.component) {


      if (this.vc) {

        const factory = this.r.resolveComponentFactory(<any>handle.component);
        const compRef = this.vc.createComponent(factory);
        const instance = <AbstractComponent<T>>compRef.instance;

        let metadata: { [k: string]: any } = null;
        if (instance.constructor.hasOwnProperty(PROP_METADATA)) {
          metadata = instance.constructor[PROP_METADATA];
        }

        instance.setElem(content);

        if (instance.build) {
          const refs = instance.build(content);

          if (metadata) {
            Object.keys(metadata).forEach(key => {
              const v = metadata[key];
              if (!_.isEmpty(v)) {

                if (_.isArray(v) && v.length === 1) {
                  const propDecorator = _.first(v);
                  if (_.isFunction(propDecorator.selector)) {
                    if (propDecorator.first) {
                      // simple ViewChild
                      instance[key] = _.find(refs, ref => ref.constructor == propDecorator.selector);
                      instance[key + '2'] = _.find(refs, ref => ref.constructor == propDecorator.selector);
                    } else {
                      // simple ViewChildren
                      instance[key] = _.filter(refs, ref => ref.constructor == propDecorator.selector);
                      instance[key + '2'] = _.filter(refs, ref => ref.constructor == propDecorator.selector);
                    }
                  }
                } else {
                  // console.error('can\'t resolve metadata', instance.constructor, key, v);
                }
              }
            });
          }
        }
        return instance;
      } else {
        console.error('No view content setted');
      }
    } else {
      throw new NoFormTypeDefinedError(content.type);
    }
    return null;

  }


  build(content: T): AbstractComponent<T>[] {
    const refs: AbstractComponent<T>[] = [];
    content.getChildren().forEach(contentObject => {
      const ref = this.buildSingle(<T>contentObject);
      refs.push(ref);
    });
    return refs;
  }

  reset() {
    if (this.vc) {
      this.vc.clear();
    }
  }

}
