import {Component, HostBinding} from '@angular/core';
import {GridComponent} from './grid.component';
import {AbstractFormComponent} from '../../libs/xsform/AbstractFormComponent';


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
