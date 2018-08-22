import { FormObject } from '../FormObject';
import { IResolver } from '../IResolver';
import { Form } from './Form';
export declare class Ref extends FormObject implements IResolver {
    use: string;
    postProcess(): void;
    resolve(form: Form): void;
}
