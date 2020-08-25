import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {IProperty} from '@typexs/schema/libs/registry/IProperty';
import {Person} from './Person';
import {Readonly} from '../../../libs/forms/decorators/Readonly';
import {Text} from '../../../libs/forms/decorators/Text';

@Entity()
export class Book {

  @Readonly()
  @Property({type: 'number', auto: true})
  id: number;

  @Text()
  @Property({type: 'string'})
  title: string;

  @Property(<IProperty & any>{type: Person, form: 'select', enum: 'EntityOptionsService'})
  author: Person;

  label() {
    return this.title;
  }
}
