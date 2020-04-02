
import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {FormGrid} from '../../../libs/forms/decorators/FormGrid';
import {Places} from './Places';


@Entity({storeable: false})
export class GroupDemoObject {

  @FormGrid()
  @Property({type: Places, cardinality: 0})
  places: Places[];

}

