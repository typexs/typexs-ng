export interface INavTreeEntry {
  label: string;
  groups: string[];
  path?: string;
  isGroup: boolean;
  children?: INavTreeEntry[];

}
