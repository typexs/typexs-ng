import {Component, Input, OnInit} from '@angular/core';
import {TreeObject} from '../../libs/views/TreeObject';
import {AbstractComponent} from '../../libs/views/AbstractComponent';




@Component({
  selector: 'view-builder',
  templateUrl: 'view-builder.component.html',
  // host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  // outputs: ['ngSubmit'],
})
export class ViewBuilderComponent<T extends TreeObject> extends AbstractComponent<T> implements OnInit {

  private _build:boolean = false;


  _instance: any;

  @Input() set instance(value: any) {
    this._instance = value;
    this._build = false;
    this.__build();
  }

  get instance(): any {
    return this._instance;
  }

  ngOnInit() {
    this.__build();
  }

  private __build(){
    if(!this._build){
      this.vc.clear();
      this.buildSingle(this._instance);
      this._build = true;
    }
  }
}

