import {FormObject} from '../FormObject';
import {FormPart} from '../decorators/FormPart';
import {Input} from './Input';

@FormPart('select')
export class Select extends FormObject {

  enum: any;

}
