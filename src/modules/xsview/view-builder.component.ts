import {Component, Input, OnInit} from '@angular/core';


import {AbstractComponent} from './AbstractComponent';
import {TreeObject} from './TreeObject';


@Component({
  selector: 'view-builder',
  templateUrl: './view-builder.component.html',
  // host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  // outputs: ['ngSubmit'],
})
export class ViewBuilderComponent<T extends TreeObject> extends AbstractComponent<T> implements OnInit {
  _instance: any;

  @Input() set instance(value: any) {
    this._instance = value;

    this.vc.clear();

    this.buildSingle(this._instance);
  }

  get instance(): any {
    return this._instance;
  }

  ngOnInit() {
    this.vc.clear();

    this.buildSingle(this._instance);
  }
}

