import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {IsNotEmpty} from 'class-validator';
import {Readonly} from '../../../libs/forms/decorators/Readonly';
import {Text} from '../../../libs/forms/decorators/Text';

@Entity()
export class Person {

  @Readonly()
  @Property({type: 'number', auto: true})
  id: number;

  @Text()
  @IsNotEmpty()
  @Property({type: 'string'})
  firstName: string;

  @Text()
  @IsNotEmpty()
  @Property({type: 'string'})
  lastName: string;

  label() {
    return this.lastName + ', ' + this.firstName;
  }
}
