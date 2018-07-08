import {Component, HostBinding} from '@angular/core';
import {AbstractFormComponent} from './AbstractFormComponent';
import {GridComponent} from './grid.component';
import {FormObject} from '../../libs/form/FormObject';
import {FormRegistry} from '../../libs/form/FormRegistry';
import {NoFormTypeDefinedError} from '../../libs/form/exceptions/NoFormTypeDefinedError';
import {GridCellComponent} from './grid-cell.component';


@Component({
  selector: 'xgridrow',
  templateUrl: './grid-row.component.html',
})
export class GridRowComponent extends AbstractFormComponent<any> {

  private grid: GridComponent;

  setGridComponent(grid: GridComponent) {
    this.grid = grid;
  }

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'form-row'
    ].join(' ');
  }


  get idx() {
    return this.context.idx;
  }

  removeRow() {
    this.grid.removeRow(this.context.idx);
  }

  build(form: FormObject) {
    form.getChildren().forEach(formObject => {


      let handle = FormRegistry.$().getOrCreateDef(formObject.type);
      if (handle && handle.component) {

        let cGridCellFactory = this.r.resolveComponentFactory(GridCellComponent);
        let cGridCell = this.vc.createComponent(cGridCellFactory);
        cGridCell.instance.data = this.data;
        cGridCell.instance.setGridComponent(this.grid);
        cGridCell.instance.setData(formObject, this.context);

        if (cGridCell.instance.vc) {
          let factory = this.r.resolveComponentFactory(<any>handle.component);
          let ref = cGridCell.instance.vc.createComponent(factory);
          let instance = <AbstractFormComponent<any>>ref.instance;
          instance.data = this.data;
          instance.setData(formObject, this.context);
          instance.build(formObject);
        } else {
          console.error('No view content setted');
        }
      } else {
        throw new NoFormTypeDefinedError(formObject.type);
      }
    });
  }

}
