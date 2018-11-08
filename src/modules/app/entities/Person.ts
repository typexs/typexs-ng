import {Entity, Property} from 'typexs-schema';

@Entity()
export class Person {

  @Property({type: 'number', form: 'readonly', auto: true})
  id: number;

  @Property({type: 'string', form: 'text'})
  firstName: string;

  @Property({type: 'string', form: 'text'})
  lastName: string;

  label(){
    return this.lastName + ', ' + this.firstName;
  }
}
