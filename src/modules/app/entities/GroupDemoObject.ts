
import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {Grid} from '../../../libs/forms/decorators/Grid';
import {Places} from './Places';


@Entity({storeable: false})
export class GroupDemoObject {

  @Grid()
  @Property({type: Places, cardinality: 0})
  places: Places[];

}

