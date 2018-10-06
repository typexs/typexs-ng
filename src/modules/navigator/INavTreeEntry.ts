export interface INavTreeEntry {
  label: string;
  group: string;
  path?: string;
  isGroup: boolean;
  children?: INavTreeEntry[];

}
