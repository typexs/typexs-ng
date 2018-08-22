import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { Radio } from '../../libs/xsform/elements/Radio';
export declare class RadioComponent extends AbstractFormComponent<Radio> {
    on: string;
    off: string;
    readonly type: string;
    isChecked: boolean;
}
