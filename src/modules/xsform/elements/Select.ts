import {FormObject} from '../FormObject';
import {ViewContent} from '../../xsview/decorators/ViewContent';

@ViewContent('select')
export class Select extends FormObject {

  enum: any;

}
