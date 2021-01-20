import {AnnotationsHelper} from 'commons-schema-api/browser';

/**
 * Mark entity as dynamic properties
 *
 * @constructor
 */
export function DynamicProperties() {
  return function (object: Function) {
    AnnotationsHelper.forEntityOn(object, {dynamic: true});
  };
}

