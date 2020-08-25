import {Component, Input} from '@angular/core';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {AbstractFormComponent} from '../../libs/forms/AbstractFormComponent';
import {LabelHandle} from '../../libs/forms/elements/LabelHandle';


@ViewComponent('label')
@Component({
  selector: 'txs-label',
  templateUrl: './label.component.html',
})
export class LabelComponent extends AbstractFormComponent<LabelHandle> {
}
