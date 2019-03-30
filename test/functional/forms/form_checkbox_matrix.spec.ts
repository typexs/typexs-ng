import {suite, test} from 'mocha-typescript';
import * as _ from 'lodash';
import {MaxLength, MinLength} from 'class-validator';
import {inspect} from 'util';
import {Log} from '@typexs/base';
import {expect} from 'chai';
import {Entity, Property, EntityRegistry} from '@typexs/schema';
import {Form, FORM_ELEMENTS} from '../../../src/libs/forms/elements';
import {FormBuilder} from '../../../src/libs/forms/FormBuilder';
import {CheckboxMatrix} from '../../../src/modules/app/entities/CheckboxMatrix';
import {CheckboxMatrixRow} from '../../../src/modules/app/entities/CheckboxMatrixRow';

FORM_ELEMENTS;





@suite('functional/forms/form_checkbox_matrix')
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
  async 'build'() {

    let checkboxMatrix = new CheckboxMatrix();
    checkboxMatrix.rows = [];

    let row = new CheckboxMatrixRow();
    row.label = 'allow all';
    checkboxMatrix.rows.push(row);

    let row2 = new CheckboxMatrixRow();
    row2.label = 'deny all';
    checkboxMatrix.rows.push(row2);

    let registry = EntityRegistry.$();
    let entityRef = registry.getEntityRefByName('CheckboxMatrix');
    let formBuilder = new FormBuilder();
    let formElements = formBuilder.buildFromEntity(entityRef);
    let children = formElements.getChildren();
    expect(children).to.have.length(1);
    let gridChildren = formElements.getChildren()[0].getChildren();
    expect(gridChildren).to.have.length(2);
    let checkbox = _.get(formElements,'children.0.children.1');
    expect(checkbox.isMultiple()).to.be.true;
    expect(checkbox.isReplicable()).to.be.true;
   // console.log(inspect(formElements,false,10))

  }
}

