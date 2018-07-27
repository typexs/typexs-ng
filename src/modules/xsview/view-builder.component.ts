import {Component, Input, OnInit} from '@angular/core';


import {AbstractComponent} from './AbstractComponent';
import {TreeObject} from './TreeObject';


@Component({
  selector: 'view-builder',
  templateUrl: './view-builder.component.html',
  //host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  //outputs: ['ngSubmit'],
})
export class ViewBuilderComponent<T extends TreeObject> extends AbstractComponent<T> implements OnInit {


  @Input()
  instance: any;



  ngOnInit() {
    this.buildSingle(this.instance);
  }


}

