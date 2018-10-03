import * as core from '@angular/core';
import {Type, TypeDecorator} from '@angular/core';
import {__assign} from 'tslib';

import * as _ from 'lodash';
import {ITemplateEntry} from './ITemplateEntry';
import {IStylesheetEntry} from './IStylesheetEntry';


/**
 * TODO register as injection token?
 */
export class ThemeRegistry {

  private static $self: ThemeRegistry;

  private themes: ITemplateEntry[] = [];

  private styles: IStylesheetEntry[] = [];

  private activeTheme: string;


  private constructor() {
  }


  static _() {
    if (!this.$self) {
      this.$self = new ThemeRegistry();
    }
    return this.$self;
  }


  getActiveTheme(): string {
    return (localStorage && localStorage.getItem('txs.theme')) || 'custom';
  }


  findStylesheet(theme: string, templateName: string, type: string = 'css'): IStylesheetEntry[] {
    let entry = _.filter(this.styles, {
      name: templateName,
      type: type,
      theme: theme
    })
    return !_.isEmpty(entry) ? entry : null;
  }


  findTemplate(theme: string, templateName: string, type: string = 'component'): ITemplateEntry {
    let entry = _.find(this.themes, {
      name: templateName,
      type: type,
      theme: theme
    })
    return entry ? entry : null;
  }


  private setThemes(themes: ITemplateEntry[] = []) {
    this.themes = themes;
    return this;
  }

  private setStyles(styles: IStylesheetEntry[] = []) {
    this.styles = styles;
    return this;
  }

  static normalize(str: string) {
    return _.kebabCase(str).replace(/^\-/, '').replace(/[^\d\w\-\_]/, '_');
  }


  static register(themes: ITemplateEntry[] = [], styles: IStylesheetEntry[] = []) {
    let registry = this._();
    registry.setThemes(themes).setStyles(styles);

    let activeUserTheme = registry.getActiveTheme();

    let Component = makeDecorator("Component", function (c) {
      if (c === void 0) {
        c = {};
      }
      return (__assign({changeDetection: core.ChangeDetectionStrategy.Default}, c));
    }, core.Directive, null, function (cls: any, annotationInstance: any, decoration: any) {
      annotationInstance.templateName = ThemeRegistry.normalize(annotationInstance.selector);
      let overrideTemplate = registry.findTemplate(activeUserTheme, annotationInstance.templateName);
      if (!_.isNull(overrideTemplate)) {
        annotationInstance.template = overrideTemplate.template;
      }

      let overrideStylesheets = registry.findStylesheet(activeUserTheme, annotationInstance.templateName);
      if (!_.isNull(overrideStylesheets)) {
        overrideStylesheets.forEach(stylesheet => {
          if(stylesheet.subcontext === 'append'){
            annotationInstance.styles.push(stylesheet.stylesheet);
          }else if(stylesheet.subcontext === 'override'){
            annotationInstance.styles = [stylesheet.stylesheet];
          }
        })
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
