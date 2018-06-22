import {Entity} from '../../../../../src/libs/xsschema/decorators/Entity';
import {Property} from '../../../../../src/libs/xsschema/decorators/Property';
import {Author} from './Author';

@Entity()
export class Book {

  @Property({type: 'number', id: true})
  id: number;

  @Property({type: 'string'})
  content: string;

  @Property({targetClass: Author})
  author: Author;

}
