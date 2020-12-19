import {Component, Input} from '@angular/core';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {LabelHandle} from '../../libs/forms/elements/LabelHandle';
import {AbstractFormComponent} from './component/AbstractFormComponent';


@ViewComponent('label')
@Component({
  selector: 'txs-label',
  templateUrl: './label.component.html',
})
export class LabelComponent extends AbstractFormComponent<LabelHandle> {
}
