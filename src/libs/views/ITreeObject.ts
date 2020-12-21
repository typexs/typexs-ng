export function isTreeObject(obj: ITreeObject<any>): obj is ITreeObject<any> {
  return (!!obj['getChildren'] || !!obj['getParent']) && !!obj['getType'];
}

export interface ITreeObject<T> {

  getType(): string;

  getChildren?(): T[];

  getParent?(): T;

}
