import { ComponentFactoryResolver, Injector, ViewContainerRef } from '@angular/core';
import { Context } from './Context';
import { TreeObject } from './TreeObject';
export declare abstract class AbstractComponent<T extends TreeObject> {
    injector: Injector;
    r: ComponentFactoryResolver;
    context: Context;
    elem: T;
    vc: ViewContainerRef;
    constructor(injector: Injector, r: ComponentFactoryResolver);
    construct(): void;
    protected setElem(elem: T): void;
    buildSingle(content: T): AbstractComponent<T>;
    build(content: T): AbstractComponent<T>[];
}
