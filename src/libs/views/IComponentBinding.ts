export interface IBindingInfo {
  context?: string;

  tags?: string[];

  [k: string]: any;
}

export interface IComponentBinding {
  /**
   * Name of the type
   */
  key: string;

  /**
   * extra
   */
  extra?: IBindingInfo;

  /**
   * class
   */
  handle?: Function | string | RegExp;

  /**
   * component class
   */
  component?: Function;
}
