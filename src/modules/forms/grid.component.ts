import {Component, ComponentRef, OnInit} from '@angular/core';
import {GridRowComponent} from './grid-row.component';

import * as _ from 'lodash';
import {ViewComponent} from '../../libs/views/decorators/ViewComponent';
import {AbstractFormComponent} from '../../libs/forms/AbstractFormComponent';
import {Grid} from '../../libs/forms/elements';
import {AbstractComponent} from '../../libs/views/AbstractComponent';
import {FormObject, isFormObject} from '../../libs/forms/FormObject';
@ViewComponent('grid')
@Component({
  selector: 'xgrid',
  templateUrl: 'grid.component.html',
})
export class GridComponent extends AbstractFormComponent<Grid> implements OnInit {


  entries: ComponentRef<GridRowComponent>[] = [];

  header:string[] = [];


  ngOnInit() {
  }


  addRow(index: number = -1) {
    let factory = this.r.resolveComponentFactory(GridRowComponent);
    let cGridRow = this.vc.createComponent(factory);
    cGridRow.instance.data = this.data;
    cGridRow.instance.setGridComponent(this);
    cGridRow.instance.setData(this.elem, this.context, this.entries.length);
    this.entries.push(cGridRow);

    let object = Reflect.construct(this.elem.getBinding().targetRef.getClass(), []);
    let path = this.context.path();
    if (this.elem.getBinding().isCollection()) {
      let arraySetted = _.get(this.data.instance, path, null);
      if (!arraySetted) {
        arraySetted = [];
      }
      arraySetted[cGridRow.instance.context.idx] = object;
      _.set(this.data.instance, path, arraySetted);
    } else {
      _.set(this.data.instance, path, object);
    }
    cGridRow.instance.build(this.elem);
    return cGridRow.instance;
  }


  removeRow(idx: number) {
    // TODO check if exists
    let path = this.context.path();

    let components = this.entries.splice(idx, 1);
    let component = components.shift();

    this.vc.remove(idx);
    if (this.elem.getBinding().isCollection()) {
      let arraySetted = _.get(this.data.instance, path, null);
      if (!arraySetted) {
        arraySetted = [];
      }
      arraySetted.splice(idx, 1);

      _.set(this.data.instance, path, arraySetted);
    } else {
      _.set(this.data.instance, path, null);
    }

    for (let i = this.entries.length - 1; i >= 0; i--) {
      this.entries[i].instance.context.idx = i;
    }
    component.destroy();
  }


  build(form: FormObject):AbstractComponent<any>[] {
    this.context.labelDisplay = 'none';


    form.getChildren().forEach(obj => {
      if(isFormObject(obj)){
        this.header.push(obj.label);
      }
    });


    let dataEntries = this.elem.getBinding().get(this.data.instance);

    let c = this.addRow();
    return [c];
  }

}