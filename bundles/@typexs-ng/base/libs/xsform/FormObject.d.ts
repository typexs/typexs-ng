import { PropertyDef } from 'typexs-schema/libs/PropertyDef';
import { TreeObject } from '../xsview/TreeObject';
export declare function isFormObject(obj: TreeObject | FormObject): obj is FormObject;
export declare abstract class FormObject extends TreeObject {
    id: string;
    usedKeys: string[];
    name: string;
    label: string;
    help: string;
    readonly: false;
    private binding;
    getBinding(): PropertyDef;
    getUsedKeys(): string[];
    getPath(): string;
    getForm(): FormObject;
    handle(key: string, value: any): void;
    /**
     * Don't override type
     */
    handleType(value: string): void;
    postProcess(): void;
    replace(someObject: FormObject): FormObject;
}
