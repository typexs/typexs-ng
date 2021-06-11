import {Component, OnInit} from '@angular/core';
import {InputDemoObject} from '../../../entities/InputDemoObject';
import {IMessage, MessageType} from '@typexs/ng-base';
import {MessageChannel} from '@typexs/ng-base';
import {MessageService} from '@typexs/ng-base';
import {LogMessage} from '@typexs/ng-base';


@Component({
  selector: 'inputDemo',
  templateUrl: 'input-demo.component.html',
})
export class InputDemoComponent implements OnInit {

  object01: any;

  result: any;

  channel: MessageChannel<IMessage>;


  constructor(private messageService: MessageService) {
    this.channel = this.messageService.get('form.input_demo');
  }


  ngOnInit() {
    this.object01 = new InputDemoObject();
  }


  onSubmit($event: any) {
    this.result = $event;

    const msg = new LogMessage();
    msg.type = $event.data.isSuccessValidated ? MessageType.SUCCESS : MessageType.ERROR;
    msg.content = $event.data.isSuccessValidated ?
      'Successful submitted and validated.' : 'Error on validation.';

    this.channel.publish(msg);
    this.messageService.getLogService().publish(msg);
  }
}
