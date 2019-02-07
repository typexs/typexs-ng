import * as _ from 'lodash';
import {IMessage, MessageType} from '../../messages/IMessage';

export class LogMessage implements IMessage {

  content: any = null;

  topic: any = null;

  type: MessageType = null;

  error: Error = null;

  source: any = null;

  method: string = null;

  data: any[] = null;



  isErrorMessage() {
    return !_.isNull(this.error);
  }

  static error(error: Error, source: any = null, method: string = null, ...data: any[]) {
    let l = new LogMessage();
    l.error = error;
    l.source = source;
    l.method = method;
    l.type = MessageType.ERROR;
    l.content = error.message;
    l.topic = error.name;
    l.data = data;
    return l;
  }
}
