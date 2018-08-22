import { GridComponent } from './grid.component';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
export declare class GridCellComponent extends AbstractFormComponent<any> {
    private grid;
    readonly hostClasses: string;
    setGridComponent(grid: GridComponent): void;
}
