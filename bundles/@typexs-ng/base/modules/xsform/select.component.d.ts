import { OnInit } from '@angular/core';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { Select } from '../../libs/xsform/elements';
export declare class Option {
    value: string;
    label: string;
    default: boolean;
}
export declare class SelectComponent extends AbstractFormComponent<Select> implements OnInit {
    cachedOptions: Option[];
    readonly supportsMultiple: boolean;
    ngOnInit(): void;
    loadOptions(): void;
    retrieveEnum(): any[];
}
