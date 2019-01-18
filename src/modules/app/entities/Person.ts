import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {IsNotEmpty} from 'class-validator';
import {FormReadonly} from '../../../libs/forms/decorators/FormReadonly';
import {FormText} from '../../../libs/forms/decorators/FormText';

@Entity()
export class Person {

  @FormReadonly()
  @Property({type: 'number', auto: true})
  id: number;

  @FormText()
  @IsNotEmpty()
  @Property({type: 'string'})
  firstName: string;

  @FormText()
  @IsNotEmpty()
  @Property({type: 'string'})
  lastName: string;

  label() {
    return this.lastName + ', ' + this.firstName;
  }
}
