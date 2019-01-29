import {MessageType} from '../../../system/messages/IMessage';

export class NotifyItem {
  heading?: string;
  message?: string;
  type: MessageType;
  id: number;
  closing?: boolean;
  time: number;
}
