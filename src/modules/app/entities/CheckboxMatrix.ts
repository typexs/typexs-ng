import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {CheckboxMatrixRow} from './CheckboxMatrixRow';
import {Grid} from '../../../libs/forms/decorators/Grid';


@Entity({storeable: false})
export class CheckboxMatrix {

  @Grid({fixed: true, nr: false})
  @Property({type: CheckboxMatrixRow, cardinality: 0})
  rows: CheckboxMatrixRow[];

}
