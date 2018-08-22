import { GridComponent } from './grid.component';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { FormObject } from '../../libs/xsform/FormObject';
import { AbstractComponent } from '../../libs/xsview/AbstractComponent';
export declare class GridRowComponent extends AbstractFormComponent<any> {
    private grid;
    setGridComponent(grid: GridComponent): void;
    readonly hostClasses: string;
    readonly idx: number;
    removeRow(): void;
    build(form: FormObject): AbstractComponent<any>[];
}
