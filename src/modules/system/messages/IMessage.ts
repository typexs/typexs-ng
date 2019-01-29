export enum MessageType {
  SUCCESS,
  ERROR,
  INFO,
  WARNING
}


export interface IMessage {

  type: MessageType;

  topic?: any;

  content: any;
}
