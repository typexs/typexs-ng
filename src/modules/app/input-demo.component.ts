import {Component, Injectable, OnInit} from '@angular/core';

import {PropertyDef} from '@typexs/schema/libs/registry/PropertyDef';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ISelectOptionsService} from '../forms/libs/ISelectOptionsService';
import {ISelectOption} from '../forms/libs/ISelectOption';
import {IMessage, MessageType} from '../system/messages/IMessage';
import {MessageChannel} from '../system/messages/MessageChannel';
import {MessageService} from '../system/messages/message.service';
import {InputDemoObject} from './entities/InputDemoObject';



@Component({
  selector: 'inputDemo',
  templateUrl: 'input-demo.component.html',

})
export class InputDemoComponent implements OnInit {

  object01: any;

  result:any;

  channel:MessageChannel<IMessage>;

  constructor(private messageService:MessageService){
    this.channel = this.messageService.get('form.input_demo');
  }

  ngOnInit() {
    this.object01 = new InputDemoObject();
  }


  onSubmit($event: any) {
    this.result = $event;
    this.channel.publish({
      type:MessageType.Success,
      content: 'Successful submitted ' + ($event.data.isSuccessValidated ? ' and validated' : ' and not validated')
    })
  }
}
