export enum MessageType {
  Success,
  Error,
  Info,
  Warning
}


export interface IMessage {

  type: MessageType;

  topic?: any;

  content: any;
}
