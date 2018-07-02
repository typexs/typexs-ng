import {MaxLength, MinLength} from 'class-validator';
import {Entity, Property} from 'typexs-schema';


@Entity()
export class XSUserTest {

  @Property({type: 'string', form: 'text'})
  @MinLength(8, {message: 'username is too short'})
  @MaxLength(32, {message: 'username is too long'})
  username: string;

  @Property({type: 'string', form: 'password'})
  @MinLength(8, {message: 'password is too short'})
  @MaxLength(64, {message: 'password is a little too long'})
  password: string;


}

