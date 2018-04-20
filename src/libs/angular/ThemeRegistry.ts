import {isEmpty} from 'lodash'
import {Type, TypeDecorator} from "@angular/core";
import * as core from "@angular/core";
import {__assign} from "tslib";
import * as c from 'case';
import {find, isNull} from 'lodash';
import {ITemplateEntry} from "./ITemplateEntry";


/**
 * TODO register as injection token?
 */
export class ThemeRegistry {

  private static $self: ThemeRegistry;

  private readonly themes: ITemplateEntry[] = [];

  private activeTheme: string;

  private constructor(themes: any) {
    this.themes = themes;
  }

  static _(themes: any = {}) {
    if (!this.$self) {
      this.$self = new ThemeRegistry(themes);
    } else {
      if (!isEmpty(themes)) {
        // TODO inform that nothing happens! themes are ignored, because already instanced
      }
    }
    return this.$self;
  }


  getActiveTheme(): string {
    return (localStorage && localStorage.getItem('txs.theme')) || 'custom';
  }


  findTemplate(theme: string, templateName: string, type: string = 'component'): ITemplateEntry {
    let entry = find(this.themes, {
      name: templateName,
      type: type,
      theme: theme
    })
    return entry ? entry : null;
  }


  static normalize(str: string) {
    return c.kebab(str).replace(/^\-/, '').replace(/[^\d\w\-\_]/, '_');
  }


  static register(themes: any = {}) {
    let registry = this._(themes);
    let activeUserTheme = registry.getActiveTheme();

    let Component = makeDecorator("Component", function (c) {
      if (c === void 0) {
        c = {};
      }
      return (__assign({changeDetection: core.ChangeDetectionStrategy.Default}, c));
    }, core.Directive, null, function (cls: any, annotationInstance: any, decoration: any) {
      annotationInstance.templateName = ThemeRegistry.normalize(annotationInstance.selector);
      let overrideTemplate = registry.findTemplate(activeUserTheme, annotationInstance.templateName);

      if (!isNull(overrideTemplate)) {
        annotationInstance.template = overrideTemplate.template;
      }
    });

    Object.defineProperty(core, 'Component', {
      get: function () {
        return Component;
      }
    })

  }

}


/** ===============================================
 * Override angular >= 5.2.10 makeDecorator
 */
export const ANNOTATIONS = '__annotations__';

/**
 * @suppress {globalThis}
 */
export function makeDecorator(
  name: string, props?: (...args: any[]) => any, parentClass?: any,
  chainFn?: (fn: Function) => void, typeFn?: (type: Type<any>, ...args: any[]) => void):
  { new(...args: any[]): any; (...args: any[]): any; (...args: any[]): (cls: any) => any; } {
  const metaCtor = makeMetadataCtor(props);

  function DecoratorFactory(...args: any[]): (cls: any) => any {
    if (this instanceof DecoratorFactory) {
      metaCtor.call(this, ...args);
      return this;
    }

    const annotationInstance = new (<any>DecoratorFactory)(...args);
    const TypeDecorator: TypeDecorator = <TypeDecorator>function TypeDecorator(cls: Type<any>) {
      typeFn && typeFn(cls, annotationInstance, ...args);
      // Use of Object.defineProperty is important since it creates non-enumerable property which
      // prevents the property is copied during subclassing.
      const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
        (cls as any)[ANNOTATIONS] :
        Object.defineProperty(cls, ANNOTATIONS, {value: []})[ANNOTATIONS];
      annotations.push(annotationInstance);
      return cls;
    };
    if (chainFn) chainFn(TypeDecorator);
    return TypeDecorator;
  }

  if (parentClass) {
    DecoratorFactory.prototype = Object.create(parentClass.prototype);
  }

  DecoratorFactory.prototype.ngMetadataName = name;
  (<any>DecoratorFactory).annotationCls = DecoratorFactory;
  return DecoratorFactory as any;
}

function makeMetadataCtor(props?: (...args: any[]) => any): any {
  return function ctor(...args: any[]) {
    if (props) {
      const values = props(...args);
      for (const propName in values) {
        this[propName] = values[propName];
      }
    }
  };
}
