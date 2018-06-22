import {MaxLength, MinLength} from 'class-validator';
import {XsEntity} from '../../libs/xsschema/decorators/XsEntity';
import {XsProperty} from '../../libs/xsschema/decorators/XsProperty';


@XsEntity()
export class XSUserTest {


  @XsProperty({type: 'string', form: 'text'})
  @MinLength(8, {message: 'username is too short'})
  @MaxLength(32, {message: 'username is too long'})
  username: string;

  @XsProperty({type: 'string', form: 'password'})
  @MinLength(8, {message: 'password is too short'})
  @MaxLength(64, {message: 'password is a little too long'})
  password: string;


}

