import * as _ from 'lodash';
import {ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {TreeObject} from '../../../libs/views/TreeObject';
import {Context} from '../../../libs/views/Context';
import {ComponentRegistryService} from './component-registry.service';
import {Log} from '../lib/log/Log';
import {NotYetImplementedError} from '@typexs/base/browser';
import {ClassType} from 'commons-schema-api/browser';
import {IInstanceableComponent} from './IInstanceableComponent';
import {C_DEFAULT} from '../constants';
import {isTreeObject} from '../../../libs/views/ITreeObject';

const PROP_METADATA = '__prop__metadata__';

export abstract class AbstractComponent<T/* extends TreeObject*/> implements IInstanceableComponent<T> {

  context: Context;

  _instance: T;

  @ViewChild('content', {read: ViewContainerRef, static: true})
  vc: ViewContainerRef;


  constructor(@Inject(Injector) public injector: Injector,
              @Inject(ComponentFactoryResolver) public r: ComponentFactoryResolver) {
    this.construct();
  }

  construct() {
  }


  getInstance(): T {
    return this._instance;
  }

  setInstance(instance: T) {
    this._instance = instance;
  }

  getViewContainerRef(): ViewContainerRef {
    return this.vc;
  }

  getComponentRegistry(): ComponentRegistryService {
    return this.injector.get(ComponentRegistryService);
  }


  buildSelf(content: any): IInstanceableComponent<any> {
    if (isTreeObject(content)) {
      const handle = this.getComponentRegistry().getDef(content.getType(), true);
      if (handle && handle.component) {
        return this.buildComponent(handle.component as any, content);
      }
    } else {
      const context = this['getViewContext'] ? this['getViewContext']() : C_DEFAULT;
      const obj = this.getComponentRegistry().getComponentForObject(content, context);
      if (obj && obj.component) {
        return this.buildComponent(obj.component as any, content);
      }
    }
    return null;
  }


  buildComponent(component: ClassType<IInstanceableComponent<T>>, content: any) {
    if (this.getViewContainerRef()) {
      const factory = this.r.resolveComponentFactory(component);
      const compRef = this.getViewContainerRef().createComponent(factory);
      const instance = <IInstanceableComponent<T>>compRef.instance;
      let metadata: { [k: string]: any } = null;
      if (instance.constructor.hasOwnProperty(PROP_METADATA)) {
        metadata = instance.constructor[PROP_METADATA];
      }
      instance.setInstance(content);

      if (instance instanceof  AbstractComponent && instance.build) {
        const refs = instance.build(content);

        if (metadata) {
          _.keys(metadata).forEach(key => {
            const v = metadata[key];
            if (!_.isEmpty(v)) {

              if (_.isArray(v) && v.length === 1) {
                const propDecorator = _.first(v);
                if (_.isFunction(propDecorator.selector)) {
                  if (propDecorator.first) {
                    // simple ViewChild
                    instance[key] = _.find(refs, ref => ref.constructor === propDecorator.selector);
                    instance[key + '2'] = _.find(refs, ref => ref.constructor === propDecorator.selector);
                  } else {
                    // simple ViewChildren
                    instance[key] = _.filter(refs, ref => ref.constructor === propDecorator.selector);
                    instance[key + '2'] = _.filter(refs, ref => ref.constructor === propDecorator.selector);
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
      Log.error('No view content setted');
      return null;
    }

  }


  build(content: T): IInstanceableComponent<T>[] {
    const refs: IInstanceableComponent<T>[] = [];
    if (content instanceof TreeObject) {
      content.getChildren().forEach(contentObject => {
        const ref = this.buildSelf(contentObject as any);
        refs.push(ref);
      });
    } else {
      throw new NotYetImplementedError();
    }
    return refs;
  }

  reset() {
    if (this.vc) {
      this.vc.clear();
    }
  }

}