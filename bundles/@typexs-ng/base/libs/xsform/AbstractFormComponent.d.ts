import { DataContainer } from 'typexs-schema/libs/DataContainer';
import { AbstractComponent } from '../xsview/AbstractComponent';
import { FormObject } from './FormObject';
import { Context } from '../xsview/Context';
export declare abstract class AbstractFormComponent<T extends FormObject> extends AbstractComponent<T> {
    static _inc: number;
    data: DataContainer<any>;
    inc: number;
    construct(): void;
    readonly id: string;
    readonly name: string;
    readonly label: string;
    readonly labelDisplay: any;
    readonly help: string;
    readonly isReadOnly: boolean;
    readonly isValid: boolean;
    protected setFormObject(elem: T): void;
    setData(elem: T, parent: Context, idx?: number): void;
    value: any;
    build(form: FormObject): AbstractComponent<T>[];
}
