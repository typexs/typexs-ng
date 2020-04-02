
import {ISelectOption} from '../../forms/libs/ISelectOption';
import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {FormLabel} from '../../../libs/forms/decorators/FormLabel';
import {FormCheckbox} from '../../../libs/forms/decorators/FormCheckbox';

@Entity({storeable: false})
export class CheckboxMatrixRow {

  @FormLabel()
  @Property({type: 'string'})
  label: string;

  @FormCheckbox({enum: 'rolesValues'})
  @Property({type: 'string', cardinality: 0})
  roles: string[];

  rolesValues: ISelectOption[] = [
    {value: 'admin', label: 'Admin'},
    {value: 'user', label: 'User'}
  ];

}
