import {suite, test} from 'mocha-typescript';
import {XsForm, XsFormBuilder} from '../../../src/modules/xform/lib/xsForm';
import {XsEntity} from '../../../src/libs/xschema/decorators/XsEntity';
import {XsProperty} from '../../../src/libs/xschema/decorators/XsProperty';
import {MaxLength, MinLength} from 'class-validator';
import {XSRegistry} from '../../../src/libs/xschema/XSRegistry';
import {inspect} from 'util';
import {Log} from 'typexs-base';


@XsEntity()
export class TestUser {


  @XsProperty({type:"string", form:'text'})
  @MinLength(8, {message: 'username is too short'})
  @MaxLength(32, {message: 'username is too long'})
  username: string = "";

  @XsProperty({type:"string", form:'password'})
  @MinLength(8, {message: 'password is too short'})
  @MaxLength(64, {message: 'password is a little too long'})
  password: string = "";


}


@suite('functional/forms/form_parse')
class Form_parseSpec {

  /*
  before() {
    Bootstrap.reset();

  }

  after() {
    Bootstrap.reset();
  }
*/

  @test
  async 'parse json form'() {

    let formJSON: any = {
      name: 'test-form',
      type: 'form',
      styles: ['form-container'],

      children: [{
        type: 'tabs',
        children: [
          {
            type: 'tab',
            children: [{
              type: 'ref',
              use: 'username'
            }]
          },
          {
            type: 'tab',
            label: '$password.label',
            children: [{
              type: 'ref',
              use: 'password',
              label: 'PW' // overriding
            }]
          }
        ]
      }],
    };


    let builder1 = new XsFormBuilder();
    let form = builder1.buildFromJSON(formJSON);
    // console.log(form);

    let entityDef = XSRegistry.getEntityDefFor('TestUser');

    let builder2 = new XsFormBuilder();
    let form2 = builder2.buildFromXsEntity(entityDef);
    //Log.info(inspect(form2,null,10));

    let form3 = (<XsForm<any>>form).combine(form2);
    Log.info(inspect(form3,null,10));

  }


}

