import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {IsNotEmpty} from 'class-validator';

@Entity()
export class Person {

  @Property({type: 'number', form: 'readonly', auto: true})
  id: number;

  @IsNotEmpty()
  @Property({type: 'string', form: 'text'})
  firstName: string;

  @IsNotEmpty()
  @Property({type: 'string', form: 'text'})
  lastName: string;

  label(){
    return this.lastName + ', ' + this.firstName;
  }
}
