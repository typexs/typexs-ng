import {Component, Injectable, OnInit} from '@angular/core';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {MaxLength, MinLength, IsEmail} from 'class-validator';
import {EqualWith} from '../../libs/validators/EqualWith';

import {PropertyDef} from '@typexs/schema/libs/registry/PropertyDef';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ISelectOptionsService} from '../forms/libs/ISelectOptionsService';
import {ISelectOption} from '../forms/libs/ISelectOption';


@Injectable()
export class OptionsService implements ISelectOptionsService {

  favoredMusicTypes: ISelectOption[] = [
    {'label': 'Indie', 'value': 'indie'},
    {'label': 'Blues', 'value': 'Blues'}
  ];


  options(property: PropertyDef): Observable<ISelectOption[]> {
    return (new BehaviorSubject(this.favoredMusicTypes)).asObservable();
  }


}

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


  /**
   * TODO: HTML5 types to implement

   color
   date
   datetime-local
   DONE: email
   month
   number
   range
   search
   tel
   time
   url
   week
   */

    // TODO multiple select!

    // HTML Type select
    // Enum or Service or ComplexEnum or Reference!
  @Property(<any>{type: 'string', form: 'select', label: 'Favored color', enum: ['Blue', 'Green', 'Red']})
  favoredColor: string;

  // HTML Type select
  // Option Enum
  @Property(<any>{
    type: 'string',
    form: 'select',
    label: 'Favored color',
    enum: [{value: 'blue1', label: 'Blue'}, {value: 'green2', label: 'Green'}, {value: 'red3', label: 'Red'}]
  })
  favoredColorCode: string;

  // Reference to proprety
  @Property(<any>{
    type: 'string',
    form: 'select',
    label: 'Favored music',
    enum: 'favoredMusicTypes'
  })
  favoredMusic: string;

  favoredMusicTypes: any[] = [
    {'label': 'Rock', 'value': 'rock'},
    {'label': 'Punk', 'value': 'punk'},
    {'label': 'Pop', 'value': 'pop'},
    {'label': 'Classic', 'value': 'classic'}
  ];

  // Reference to service
  // TODO analyse observable
  @Property(<any>{
    type: 'string',
    form: 'select',
    label: 'Favored music from service',
    enum: OptionsService
  })
  favoredMusicService: string;


  // TODO grouping, alignment (inline, top)
  //
  @Property(<any>{
    type: 'string',
    cardinality: 0,
    form: 'select',
    label: 'Favored music',
    enum: 'favoredMusicTypes'
  })
  favoredMusicMulti: string[];


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


  onSubmit($event: any) {
    console.log($event);
  }
}
