import * as _ from 'lodash';
import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

export interface ToggleSelector {
  [selector: string]: string | string[];
}

@Directive({
  exportAs: 'txs-toggle',
  selector: '[txs-toggle]',
})
export class ToggleDirective {

  /**
   * Defines which element(s) or host must toggle which class
   */
  @Input('txs-toggle')
  toggle: string | string[] | ToggleSelector | [string | string[], ToggleSelector];


  constructor(private renderer: Renderer2, private ref: ElementRef) {
  }


  @HostListener('click')
  onClick() {
    if (_.isString(this.toggle)) {
      this._toggleSelf(this.toggle);
    } else if (_.isArray(this.toggle)) {
      const hostToggleClassesArray: string[][] = <string[][]>_.filter(this.toggle, e => _.isArray(e));
      let hostToggleClasses: string[] = <string[]>_.filter(this.toggle, e => _.isString(e));
      const hostToggleRfes: ToggleSelector = _.merge({}, ...<ToggleSelector[]>_.filter(this.toggle, e => _.isPlainObject(e)));

      if (!_.isEmpty(hostToggleClassesArray)) {
        hostToggleClasses = _.concat(hostToggleClasses, ...hostToggleClassesArray);
      }

      if (!_.isEmpty(hostToggleClasses)) {
        this._toggleSelf(hostToggleClasses);
      }

      if (!_.isEmpty(hostToggleRfes)) {
        const keys = _.keys(hostToggleRfes);
        for (const k of keys) {
          this._toggleRef(k, hostToggleRfes[k]);
        }
      }


    }

    // this._toggleClass($event, this.toggle);
  }

  private _toggleRef(ref: string, clazz: string | string[]) {
    let arr: string[] = [];
    if (!_.isArray(clazz)) {
      arr.push(clazz);
    } else {
      arr = clazz;
    }
    for (const c of arr) {
      const elem = document.querySelector(ref);
      const hasClass = elem.classList.contains(c);
      if (hasClass) {
        this.renderer.removeClass(elem, c);
      } else {
        this.renderer.addClass(elem, c);
      }
    }
  }


  private _toggleSelf(clazz: string | string[]) {
    let arr: string[] = [];
    if (!_.isArray(clazz)) {
      arr.push(clazz);
    } else {
      arr = clazz;
    }
    for (const c of arr) {
      const hasClass = this.ref.nativeElement.classList.contains(c);
      if (hasClass) {
        this.renderer.removeClass(this.ref.nativeElement, c);
      } else {
        this.renderer.addClass(this.ref.nativeElement, c);
      }
    }
  }


}
