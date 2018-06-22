import {XsPropertyOf} from '../../../../../src/libs/xsschema/decorators/XsPropertyOf';
import {Book} from './Book';
import {XsProperty} from '../../../../../src/libs/xsschema/decorators/XsProperty';

// @XsPropertyOf('Book')
/**
 * - first parameter must be the reference to an other entity (string|Class)
 * - second parameter must be the name of the property, it is also the name
 *   under which the property is attach in the entity by (defineProperty)
 */
@XsPropertyOf(Book,'summary' /*, {single_or_multiple}*/)
export class Summary {

  @XsProperty({type:'number'})
  size:number;


  @XsProperty({type:'string'})
  content: string;

}
