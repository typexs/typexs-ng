import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {CheckboxMatrixRow} from './CheckboxMatrixRow';
import {FormGrid} from '../../../libs/forms/decorators/FormGrid';


@Entity({storeable: false})
export class CheckboxMatrix {

  @FormGrid({fixed: true, nr: false})
  @Property({type: CheckboxMatrixRow, cardinality: 0})
  rows: CheckboxMatrixRow[];

}
