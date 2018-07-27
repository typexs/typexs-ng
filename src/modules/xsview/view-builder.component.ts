import {Component, Input, OnInit} from '@angular/core';

import {TreeObject} from '../../libs/content/TreeObject';
import {AbstractComponent} from './AbstractComponent';


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

