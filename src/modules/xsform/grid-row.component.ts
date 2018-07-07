import {Component} from '@angular/core';
import {AbstractFormComponent} from './AbstractFormComponent';
import {GridComponent} from './grid.component';


@Component({
  selector: 'xgridrow',
  templateUrl: './grid-row.component.html',
})
export class GridRowComponent extends AbstractFormComponent<any> {

  private grid: GridComponent;

  setGridComponent(grid: GridComponent) {
    this.grid = grid;
  }


  removeRow() {
    this.grid.removeRow(this.naming.idx);
  }

}
