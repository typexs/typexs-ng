import {suite, test} from 'mocha-typescript';

import {MaxLength, MinLength} from 'class-validator';
import {inspect} from 'util';
import {expect} from 'chai';
import {Log} from '@typexs/base';
import {Entity, Property, EntityRegistry} from '@typexs/schema';
import {Form, FORM_ELEMENTS} from '../../../src/libs/forms/elements';
import {FormBuilder} from '../../../src/libs/forms/FormBuilder';

FORM_ELEMENTS;



@Entity({storeable: false})
export class TreeTestSub {

  @Property({type: 'string'})
  name: string = '';


}


@Entity({storeable: false})
export class TreeTestData {


  @Property({type: 'string'})
  name: string = '';

  @Property({type: TreeTestSub, cardinality: 0})
  sub: TreeTestSub[];


}
@suite('functional/forms/form_builder')
class FormParseSpec {

  @test
  async 'tree data parse'() {

    const builder = new FormBuilder();
    const entityDef = EntityRegistry.getEntityRefFor('TreeTestData');
    const tree = builder.buildFromEntity(entityDef);
    expect(tree.children).to.have.length(2);
    expect(tree.children[0].type).to.be.eq('input');
    expect((<any>tree.children[0]).variant).to.be.eq('text');
    expect(tree.children[0].children).to.have.length(0);
    expect(tree.children[1].type).to.be.eq('select');
    expect((<any>tree.children[1]).variant).to.be.eq('select');
    expect(tree.children[1].children).to.have.length(0);
  }
}

