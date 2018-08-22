import { IElementDef } from './IElementDef';
export declare class ContentComponentRegistry {
    private static $self;
    private formHandler;
    private constructor();
    static $(): ContentComponentRegistry;
    getOrCreateDef(typeName: string): IElementDef;
    getDef(typeName: string): IElementDef;
    static addHandler(typeName: string, klass: Function): IElementDef;
    static addComponent(typeName: string, klass: Function): IElementDef;
    static createHandler(typeName: string): any;
    static createComponent(typeName: string): any;
}
