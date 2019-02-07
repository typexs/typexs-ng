import {MessageType} from '../../../system/messages/IMessage';
import * as _ from 'lodash';

export class NotifyItem {
  heading?: string;
  message?: string;
  type: MessageType;

  id: number;
  closing?: boolean;
  time: number;


  getTypeAsLowerCase():string{
    if(!_.isNull(this.type)){
      return MessageType[this.type].toLowerCase()
    }
    return null;

  }

}
