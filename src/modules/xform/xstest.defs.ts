
import {MaxLength, MinLength} from 'class-validator';
import {XSEntity} from '../../libs/xschema/decorators/XSEntity';
import {XSProperty} from '../../libs/xschema/decorators/XSProperty';



@XSEntity()
export class XSUserTest {


  @XSProperty()
  @MinLength(8, {message: "username is too short"})
  @MaxLength(32, {message: "username is too long"})
  username: string ;

  @XSProperty()
  @MinLength(8, {message: "password is too short"})
  @MaxLength(64, {message: "password is a little too long"})
  password:string ;


}

