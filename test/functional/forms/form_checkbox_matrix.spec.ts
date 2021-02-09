import {suite, test} from '@testdeck/mocha';
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
import {ComponentRegistry} from '../../../src';

FORM_ELEMENTS;





@suite('functional/forms/form_checkbox_matrix')
class FormParseSpec {

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

    const checkboxMatrix = new CheckboxMatrix();
    checkboxMatrix.rows = [];

    const row = new CheckboxMatrixRow();
    row.label = 'allow all';
    checkboxMatrix.rows.push(row);

    const row2 = new CheckboxMatrixRow();
    row2.label = 'deny all';
    checkboxMatrix.rows.push(row2);

    const registry = EntityRegistry.$();
    const entityRef = registry.getEntityRefByName('CheckboxMatrix');
    const formBuilder = new FormBuilder(ComponentRegistry.$());
    const formElements = formBuilder.buildFromEntity(entityRef);
    const children = formElements.getChildren();
    expect(children).to.have.length(1);
    const gridChildren = formElements.getChildren()[0].getChildren();
    expect(gridChildren).to.have.length(2);
    const checkbox = _.get(formElements, 'children.0.children.1');
    expect(checkbox.isMultiple()).to.be.true;
    expect(checkbox.isReplicable()).to.be.true;
   // console.log(inspect(formElements,false,10))

  }
}

