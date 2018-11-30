import {Component, Input} from '@angular/core';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {AbstractFormComponent} from '../../libs/forms/AbstractFormComponent';
import {Label} from '../../libs/forms/elements';


@ViewComponent('label')
@Component({
  selector: 'xlabel',
  templateUrl: './label.component.html',
})
export class LabelComponent extends AbstractFormComponent<Label> {
}
