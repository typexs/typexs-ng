import {IClassRef} from 'commons-schema-api/browser';
import {IEntityRef} from 'commons-schema-api';

export interface IComponentBinding {
  /**
   * Name of the type
   */
  type: string;
  /**
   *
   */
  handle?: Function;
  /**
   *
   */
  component?: Function;
}
