import {MaxLength, MinLength} from 'class-validator';
import {Entity} from 'typexs-schema/libs/decorators/Entity';
import {Property} from 'typexs-schema/libs/decorators/Property';


export class AuthVariant {

  label: string;

  icon: string;

  type: string;


}

export class LocalAuthVariant extends AuthVariant {

  @Property({type: 'string', form: 'text'})
  @MinLength(8, {message: 'username is too short'})
  @MaxLength(32, {message: 'username is too long'})
  username: string;

  @Property({type: 'string', form: 'password'})
  @MinLength(8, {message: 'password is too short'})
  @MaxLength(64, {message: 'password is a little too long'})
  password: string;

}


@Entity(<any>{storeable: false})
export class XSUserTest {


  @Property(<any>{storeable: false, targetClass: AuthVariant, form: 'select', valueOf: 'variants'})
  variant: AuthVariant;


  variants: AuthVariant[] = [];
}

