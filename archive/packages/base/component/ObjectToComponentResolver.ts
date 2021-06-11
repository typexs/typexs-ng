import {IObjectToComponentResolver} from './IObjectToComponentResolver';
import {IComponentBinding} from '../../../libs/views/IComponentBinding';

export class ObjectToComponentResolver implements IObjectToComponentResolver {
  /**
   * Returns component class for given object or null if nothing declared
   *
   * @param object
   * @return Function
   */
  resolve(object: any, context?: string): IComponentBinding {
    return null;
  }
}
