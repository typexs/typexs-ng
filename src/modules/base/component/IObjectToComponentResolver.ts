import {ClassType} from 'commons-schema-api/browser';
import {IComponentBinding} from '../../../libs/views/IComponentBinding';

export interface IObjectToComponentResolver {
  /**
   * Returns component class for given object or null if nothing declared
   *
   * @param object
   * @return Function
   */
  resolve(object: any, context?: string): IComponentBinding;
}
