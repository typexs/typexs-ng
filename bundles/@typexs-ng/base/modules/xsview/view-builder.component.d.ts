import { OnInit } from '@angular/core';
import { TreeObject } from '../../libs/xsview/TreeObject';
import { AbstractComponent } from '../../libs/xsview/AbstractComponent';
export declare class ViewBuilderComponent<T extends TreeObject> extends AbstractComponent<T> implements OnInit {
    private _build;
    _instance: any;
    instance: any;
    ngOnInit(): void;
    private __build();
}
