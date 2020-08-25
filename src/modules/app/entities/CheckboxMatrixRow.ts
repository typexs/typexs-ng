
import {ISelectOption} from '../../forms/libs/ISelectOption';
import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {Label} from '../../../libs/forms/decorators/Label';
import {Checkbox} from '../../../libs/forms/decorators/Checkbox';

@Entity({storeable: false})
export class CheckboxMatrixRow {

  @Label()
  @Property({type: 'string'})
  label: string;

  @Checkbox({enum: 'rolesValues'})
  @Property({type: 'string', cardinality: 0})
  roles: string[];

  rolesValues: ISelectOption[] = [
    {value: 'admin', label: 'Admin'},
    {value: 'user', label: 'User'}
  ];

}
