export declare type ALIGNMENT = 'vertical' | 'horizontal';
export declare type LABEL_DISPLAY = 'top' | 'inline' | 'none';
export declare class Context {
    name: string;
    idx: number;
    parent: Context;
    labelDisplay: LABEL_DISPLAY;
    child(_name?: string, idx?: number): Context;
    path(): string;
    get(key: string, _default?: any): any;
}
