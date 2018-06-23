import {Entity} from '../../../../../src/libs/xsschema/decorators/Entity';
import {Property} from '../../../../../src/libs/xsschema/decorators/Property';


@Entity()
export class Room {

  @Property({type: 'number', auto: true})
  id: number;

}
