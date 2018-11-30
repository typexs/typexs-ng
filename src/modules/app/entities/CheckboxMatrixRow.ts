
import {ISelectOption} from '../../forms/libs/ISelectOption';
import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {Property} from '@typexs/schema/libs/decorators/Property';

@Entity({storeable: false})
export class CheckboxMatrixRow {

  @Property({type: 'string', form: 'label'})
  label: string;

  @Property(<any>{type: 'string', form: 'checkbox', enum: 'roleValues', cardinality: 0})
  roles: string[];

  roleValues: ISelectOption[] = [
    {value: 'admin', label: 'Admin'},
    {value: 'user', label: 'User'}
  ];

}
