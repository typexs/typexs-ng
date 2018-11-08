import {Entity, IProperty, Property} from 'typexs-schema';
import {Person} from './Person';

@Entity()
export class Book {

  @Property({type: 'number', form: 'readonly', auto: true})
  id: number;

  @Property({type: 'string', form: 'text'})
  title: string;

  @Property(<IProperty & any>{type: Person, form: 'select', enum: 'EntityOptionsService'})
  author: Person;

  label() {
    return this.title;
  }
}
