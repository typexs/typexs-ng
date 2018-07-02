import {Element} from '../decorators/Element';
import {FormObject} from '../FormObject';

@Element('input')
export class Input extends FormObject {
  variant: string = 'text';
}
