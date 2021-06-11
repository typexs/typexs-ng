import {ISelectOption} from '../../forms/libs/ISelectOption';
import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {Checkbox, Label} from '@typexs/ng';
import {K_STORABLE} from '@typexs/schema';

@Entity({[K_STORABLE]: false})
export class CheckboxMatrixRow {

  @Label()
  @Property()
  label: string;

  @Checkbox({enum: 'rolesValues'})
  @Property({type: 'string', cardinality: 0})
  roles: string[];

  @Property({virtual: true})
  rolesValues: ISelectOption[] = [
    {value: 'admin', label: 'Admin'},
    {value: 'user', label: 'User'}
  ];

}
