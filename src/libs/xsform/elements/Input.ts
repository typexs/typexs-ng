
import {FormObject} from '../FormObject';
import {ViewContent} from '../../xsview/decorators/ViewContent';

@ViewContent('input')
export class Input extends FormObject {

  variant: string = 'text';


  handleVariant(value: string) {
    this.variant = value;
  }

}
