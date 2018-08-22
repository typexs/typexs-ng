import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { Checkbox } from '../../libs/xsform/elements';
export declare class CheckboxComponent extends AbstractFormComponent<Checkbox> {
    readonly type: string;
    isChecked: boolean;
}
