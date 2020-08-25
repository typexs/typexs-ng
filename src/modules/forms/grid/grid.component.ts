import {Component, ComponentRef, OnInit} from '@angular/core';
import {GridRowComponent} from './grid-row.component';

import * as _ from 'lodash';
import {ViewComponent} from '../../../libs/views/decorators/ViewComponent';
import {AbstractFormComponent} from '../../../libs/forms/AbstractFormComponent';
import {GridHandle} from '../../../libs/forms/elements';
import {AbstractComponent} from '../../../libs/views/AbstractComponent';
import {FormObject, isFormObject} from '../../../libs/forms/FormObject';
import {EnumHandle} from './../libs/EnumHandle';
import {Observable} from 'rxjs/Observable';
import {GridColumnDef} from './GridColumnDef';


@ViewComponent('grid')
@Component({
  selector: 'txs-grid',
  templateUrl: 'grid.component.html',
})
export class GridComponent extends AbstractFormComponent<GridHandle> implements OnInit {


  entries: ComponentRef<GridRowComponent>[] = [];

  columns: GridColumnDef[] = [];


  ngOnInit() {
  }

  showNr() {
    return this.elem.options.nr;
  }

  isFixed() {
    return this.elem.options.fixed;
  }

  analyse() {
  }

  private findColumns(form: FormObject, tmpObj: any = null) {
    form.getChildren().forEach(obj => {
      if (isFormObject(obj)) {
        //
        if (obj.isReplicable()) {
          // it is so has enum select + multiple but one-decision element like checkbox or radio
          if (!tmpObj) {
            tmpObj = obj.getBinding().getSourceRef().create();
          }

          let enumHandle = new EnumHandle(this.injector, obj);
          let obs = enumHandle.retrieveEnum(tmpObj);
          if (obs instanceof Observable) {
            throw new Error('TODO handle observable');
          } else {
            let idx = 0;
            obs.forEach(o => {
              let def = new GridColumnDef();
              def.idx = idx++;
              def.label = o.label;
              def.value = o.value;
              def.elem = obj;
              this.columns.push(def);
            });
          }
        } else {
          let def = new GridColumnDef();
          //def.label = obj.label;
          def.elem = obj;
          this.columns.push(def);
        }

      }
    });
  }


  build(form: FormObject): AbstractComponent<any>[] {
    this.context.labelDisplay = 'none';
    let dataEntries = this.elem.getBinding().get(this.data.instance);
    this.findColumns(form, _.first(dataEntries));

    let ret = [];
    if (!_.isEmpty(dataEntries)) {
      for (let i = 0; i < dataEntries.length; i++) {
        let c = this.addRow(dataEntries[i], i);
        ret.push(c);
      }
    }

    // TODO append lines
    if (!this.isFixed()) {
      let c = this.addRow();
      ret.push(c);

    }
    return ret;
  }

  addRow(row: any = null, index: number = -1) {
    let factory = this.r.resolveComponentFactory(GridRowComponent);
    let cGridRow = this.vc.createComponent(factory);
    cGridRow.instance.data = this.data;
    cGridRow.instance.setGridComponent(this);
    cGridRow.instance.setData(this.elem, this.context, this.entries.length);
    this.entries.push(cGridRow);

    if (!row) {
      let object = Reflect.construct(this.elem.getBinding().getTargetRef().getClass(), []);
      let path = this.context.path();

      if (this.elem.isMultiple()) {
        let arraySetted = _.get(this.data.instance, path, null);
        if (!arraySetted) {
          arraySetted = [];
        }
        arraySetted[cGridRow.instance.context.idx] = object;
        _.set(this.data.instance, path, arraySetted);
      } else {
        _.set(this.data.instance, path, object);
      }

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


}
