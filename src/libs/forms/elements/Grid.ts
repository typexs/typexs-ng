import * as _ from 'lodash';
import {FormObject} from '../FormObject';
import {ViewContent} from '../../views/decorators/ViewContent';
import {DEFAULT_GRID_OPTIONS, IGridOptions} from './IGridOptions';

@ViewContent('grid')
export class Grid extends FormObject {

  options: IGridOptions;

  handleGrid(options: IGridOptions) {
    this.options = _.defaults(options, DEFAULT_GRID_OPTIONS);
  }

}
