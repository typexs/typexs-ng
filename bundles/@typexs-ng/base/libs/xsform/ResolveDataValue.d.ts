import { FormObject } from './FormObject';
import { Form } from './elements/Form';
import { IResolver } from './IResolver';
export declare class ResolveDataValue implements IResolver {
    private orgValue;
    private path;
    private fetchKey;
    private property;
    private object;
    constructor(value: string, object: FormObject, property: string);
    get(): string;
    resolve(form: Form): any;
}
