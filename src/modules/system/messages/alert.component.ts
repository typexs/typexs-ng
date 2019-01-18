import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IMessage, MessageType} from './IMessage';
import {MessageChannel} from './MessageChannel';
import {ISubscription} from 'rxjs/Subscription';


@Component({
  selector: 'txs-alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy{
  messages: IMessage[] = [];

  @Input()
  channel: MessageChannel<IMessage>;

  subscription:ISubscription;

  ngOnInit() {
    if (this.channel) {
      this.subscription = this.channel.subscribe(message => {
        if (!message) {
          this.messages = [];
        } else {
          this.messages.push(message);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  removeAlert(alert: IMessage) {
    this.messages = this.messages.filter(x => x !== alert);
  }

  cssClass(alert: IMessage): string {
    if (!alert) {
      return '';
    }

    // return css class based on alert type
    switch (alert.type) {
      case MessageType.Success:
        return 'alert alert-success';
      case MessageType.Error:
        return 'alert alert-danger';
      case MessageType.Info:
        return 'alert alert-info';
      case MessageType.Warning:
        return 'alert alert-warning';
    }

    return '';
  }
}
