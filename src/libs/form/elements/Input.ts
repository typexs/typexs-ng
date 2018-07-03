
import {FormObject} from '../FormObject';
import {FormPart} from '../decorators/FormPart';

@FormPart('input')
export class Input extends FormObject {
  variant: string = 'text';
}
