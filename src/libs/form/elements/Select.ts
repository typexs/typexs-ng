import {FormObject} from '../FormObject';
import {Input} from './Input';
import {ContentPart} from '../../content/decorators/ContentPart';

@ContentPart('select')
export class Select extends FormObject {

  enum: any;

}
