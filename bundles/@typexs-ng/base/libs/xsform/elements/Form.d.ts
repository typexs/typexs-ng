import { IResolver } from '../IResolver';
import { FormObject } from '../FormObject';
export declare class Form extends FormObject {
    dataContainer: any;
    resolver: IResolver[];
    combine(otherForm: Form): this;
    get(path: string): any;
}
