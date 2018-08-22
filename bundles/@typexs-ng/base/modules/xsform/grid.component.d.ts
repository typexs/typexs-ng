import { ComponentRef, OnInit } from '@angular/core';
import { GridRowComponent } from './grid-row.component';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { Grid } from '../../libs/xsform/elements';
import { AbstractComponent } from '../../libs/xsview/AbstractComponent';
import { FormObject } from '../../libs/xsform/FormObject';
export declare class GridComponent extends AbstractFormComponent<Grid> implements OnInit {
    entries: ComponentRef<GridRowComponent>[];
    header: string[];
    ngOnInit(): void;
    addRow(index?: number): GridRowComponent;
    removeRow(idx: number): void;
    build(form: FormObject): AbstractComponent<any>[];
}
