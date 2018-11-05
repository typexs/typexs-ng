import {Entity, Property} from 'typexs-schema';
import {Person} from './Person';

@Entity()
export class Book {

  @Property({type: 'number', form: 'readonly', auto: true})
  id: number;

  @Property({type: 'string', form: 'text'})
  title: string;

  @Property({type: Person, form: 'select'})
  author: Person;
}
