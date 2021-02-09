import {Book} from './Book';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Select} from '../../../libs/forms/decorators/Select';
import {Readonly} from '../../../libs/forms/decorators/Readonly';
import {EntityOptionsService} from '../../entity/entity-options.service';


@Entity()
export class BookShop {

  @Readonly()
  @Property({type: 'number', auto: true})
  id: number;

  @Property({type: 'string'})
  shopName: string;

  @Select({enum: EntityOptionsService.name})
  @Property({type: Book, cardinality: 0})
  private books: Book[];

}
