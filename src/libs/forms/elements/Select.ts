import {FormObject} from '../FormObject';
import {ViewContent} from '../../views/decorators/ViewContent';

@ViewContent('select')
export class Select extends FormObject {

  enum: any;

}
