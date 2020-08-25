import {MessageType} from '../../../base/messages/IMessage';
import * as _ from 'lodash';

export class NotifyItem {
  heading?: string;
  message?: string;
  type: MessageType;

  id: number;
  closing?: boolean;
  time: number;


  getTypeAsLowerCase(): string {
    if (!_.isNull(this.type)) {
      const name = MessageType[this.type];
      return name.toLowerCase();
    }
    return null;

  }

}
