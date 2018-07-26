import {Component, HostBinding} from '@angular/core';
import {AbstractFormComponent} from './AbstractFormComponent';
import {GridComponent} from './grid.component';


@Component({
  selector: 'xgridcell',
  templateUrl: './grid-cell.component.html',
})
export class GridCellComponent extends AbstractFormComponent<any> {

  private grid: GridComponent;

  @HostBinding('class')
	get hostClasses(): string {
		return [
		  'col'
		].join(' ');
	}

  setGridComponent(grid: GridComponent) {
    this.grid = grid;
  }




}
