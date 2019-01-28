import * as _ from 'lodash';
import {IMessage, MessageType} from '../../messages/IMessage';

export class LogMessage implements IMessage {

  content: any;

  topic: any;

  type: MessageType;

  error: Error;


  isErrorMessage() {
    return !_.isNull(this.error);
  }

  static error(error: Error) {
    let l = new LogMessage();
    l.error = error;
    l.type = MessageType.Error;
    l.content = error.message;
    l.topic = error.name;
    return l;
  }
}
