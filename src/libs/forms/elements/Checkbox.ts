import {Input} from './Input';
import {ViewContent} from '../../views/decorators/ViewContent';

@ViewContent('checkbox')
export class Checkbox extends Input {

  enum: any;

  postProcess() {
    super.postProcess();
    if(this.isMultiple() && this.isSelection()){
      this.handle('replicable',true);
    }
  }

}
