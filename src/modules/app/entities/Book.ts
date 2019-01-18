import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {IProperty} from '@typexs/schema/libs/registry/IProperty';
import {Person} from './Person';
import {FormReadonly} from '../../../libs/forms/decorators/FormReadonly';
import {FormText} from '../../../libs/forms/decorators/FormText';

@Entity()
export class Book {

  @FormReadonly()
  @Property({type: 'number',auto: true})
  id: number;

  @FormText()
  @Property({type: 'string'})
  title: string;

  @Property(<IProperty & any>{type: Person, form: 'select', enum: 'EntityOptionsService'})
  author: Person;

  label() {
    return this.title;
  }
}
