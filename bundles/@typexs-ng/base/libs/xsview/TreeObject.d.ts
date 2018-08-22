import { Context } from './Context';
export declare abstract class TreeObject {
    readonly type: string;
    context: Context;
    index: number;
    parent: TreeObject;
    children: TreeObject[];
    insert(object: TreeObject): void;
    getParent(): TreeObject;
    setParent(parent: TreeObject): void;
    getChildren(): TreeObject[];
}
