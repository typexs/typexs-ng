
import {MaxLength, MinLength} from 'class-validator';
import {XsEntity} from '../../libs/xschema/decorators/XSEntity';
import {XsProperty} from '../../libs/xschema/decorators/XSProperty';



@XsEntity()
export class XSUserTest {


  @XsProperty()
  @MinLength(8, {message: "username is too short"})
  @MaxLength(32, {message: "username is too long"})
  username: string ;

  @XsProperty()
  @MinLength(8, {message: "password is too short"})
  @MaxLength(64, {message: "password is a little too long"})
  password:string ;


}

