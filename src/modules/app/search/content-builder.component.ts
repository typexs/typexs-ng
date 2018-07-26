import {Component, ComponentFactoryResolver, Inject, Injector, Input, OnInit} from '@angular/core';
import {ContentComponent} from '../../../libs/content/decorators/ContentComponent';
import {AbstractComponent} from '../../../libs/content/AbstractComponent';



@ContentComponent('content-builder')
@Component({
  selector: 'content-builder',
  templateUrl: './content-builder.component.html',
  //host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  //outputs: ['ngSubmit'],
})
export class ContentBuilderComponent extends AbstractComponent<any> implements OnInit {


  @Input()
  instance: any;


  constructor(
              @Inject(Injector) protected injector: Injector,
              @Inject(ComponentFactoryResolver) protected   r: ComponentFactoryResolver) {
    super(injector, r);
  }


  ngOnInit() {
    this.buildSingle(this.instance);
  }




}

