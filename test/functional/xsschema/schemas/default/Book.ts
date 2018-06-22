import {XsEntity} from '../../../../../src/libs/xsschema/decorators/XsEntity';
import {XsProperty} from '../../../../../src/libs/xsschema/decorators/XsProperty';
import {Author} from './Author';

@XsEntity()
export class Book {

  @XsProperty({type: 'number',id:true})
  id: number;

  @XsProperty({type: 'string'})
  content: string;

  @XsProperty({targetClass: Author})
  author: Author;

}
