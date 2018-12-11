import {Book} from './Book';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {FormSelect} from '../../../libs/forms/decorators/FormSelect';
import {FormReadonly} from '../../../libs/forms/decorators/FormReadonly';


@Entity()
export class BookShop {

  @FormReadonly()
  @Property({type: 'number', auto: true})
  id: number;

  @Property({type: 'string'})
  shopName: string;

  @FormSelect({enum: 'EntityOptionsService'})
  @Property({type: Book, cardinality: 0})
  private books: Book[];

}
