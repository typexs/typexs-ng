import {XsEntity} from '../../../../../src/libs/xsschema/decorators/XsEntity';
import {XsProperty} from '../../../../../src/libs/xsschema/decorators/XsProperty';


@XsEntity()
export class Author {


  @XsProperty({type: 'number', id: true})
  id: number;


  @XsProperty({type: 'string'})
  firstName: string;


  @XsProperty({type: 'string'})
  lastName: string;

}
