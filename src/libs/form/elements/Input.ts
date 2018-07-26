
import {FormObject} from '../FormObject';
import {ContentPart} from '../../content/decorators/ContentPart';

@ContentPart('input')
export class Input extends FormObject {

  variant: string = 'text';


  handleVariant(value: string) {
    this.variant = value;
  }

}
