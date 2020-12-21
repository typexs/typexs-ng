import {Component, Input, OnInit} from '@angular/core';
import {TreeObject} from '../../libs/views/TreeObject';
import {AbstractComponent} from '../base/component/AbstractComponent';




@Component({
  selector: 'txs-view-builder',
  templateUrl: 'view-builder.component.html',
  // host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  // outputs: ['ngSubmit'],
})
export class ViewBuilderComponent<T extends TreeObject> extends AbstractComponent<T> implements OnInit {

  private _build = false;


  @Input() set instance(value: any) {
    this.setInstance(value);
    this._build = false;
    this.__build();
  }

  get instance(): any {
    return this.getInstance();
  }

  ngOnInit() {
    this.__build();
  }

  private __build() {
    if (!this._build) {
      this.getViewContainerRef().clear();
      this.buildSelf(this.instance);
      this._build = true;
    }
  }
}

