
import {FormObject} from '../FormObject';
import {ViewContent} from '../../views/decorators/ViewContent';

@ViewContent('input')
export class Input extends FormObject {

  variant: string = 'text';


  handleVariant(value: string) {
    this.variant = value;
  }

}
