import {Component, OnInit} from '@angular/core';
import {Property} from 'typexs-schema/libs/decorators/Property';
import {Entity} from 'typexs-schema/libs/decorators/Entity';
import {MaxLength, MinLength, IsEmail} from 'class-validator';
import {EqualWith} from '../../libs/validators/EqualWith';


@Entity()
export class InputDemoObject01 {

  // HTML Type text
  @Property({type: 'string', form: 'text'})
  @MinLength(8, {message: 'username is too short'})
  @MaxLength(32, {message: 'username is too long'})
  username: string = 'Test';

  // HTML Type password
  @Property({type: 'string', form: 'password'})
  @MinLength(8, {message: 'password is too short'})
  @MaxLength(64, {message: 'password is a little too long'})
  password: string;

  // HTML Type password confirmation
  @Property({type: 'string', form: 'password'})
  @EqualWith('password', {message: 'password is not equal'})
  passwordConfirm: string;

  // HTML5 Type email with additional help text
  @Property(<any>{type: 'string', form: 'email', help: 'We\'ll never share your email with anyone else.'})
  @IsEmail()
  email: string;

  // HTML Type text and readonly
  @Property(<any>{type: 'string', form: 'text', readonly: true})
  street: string;

  // HTML Type checkbox
  @Property(<any>{type: 'boolean', form: 'checkbox'})
  allowAccess: boolean;

  // HTML Type checkbox
  @Property(<any>{type: 'boolean', form: 'checkbox', label: 'Allow no access'})
  allowNoAccess: boolean = true;

  // HTML Type radio
  @Property(<any>{type: 'boolean', form: 'radio', label: 'Use radio'})
  useRadio: boolean;

  // HTML Type radio
  // Enum or Service or ComplexEnum or Reference!
  @Property(<any>{type: 'string', form: 'select', label: 'Favored color', enum: ['Blue', 'Green', 'Red']})
  favoredColor: string;


}


@Component({
  selector: 'inputDemo',
  templateUrl: 'input-demo.component.html',

})
export class InputDemoComponent implements OnInit {

  object01: any;

  ngOnInit() {
    this.object01 = new InputDemoObject01();
  }

}
