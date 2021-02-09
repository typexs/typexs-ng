import * as _ from 'lodash';


import {DataContainer} from '@typexs/base';
import {ClassRef, XS_TYPE_PROPERTY} from 'commons-schema-api/browser';
import {Expressions} from 'commons-expressions/browser';
import {Context} from '../../../libs/views/Context';
import {UrlHelper} from '../../base/lib/UrlHelper';
import {FormObject, isFormObject} from '../../../libs/forms/FormObject';
import {NoFormTypeDefinedError} from '../../../libs/exceptions/NoFormTypeDefinedError';
import {AbstractComponent} from '../../base/component/AbstractComponent';


export abstract class AbstractFormComponent<T extends FormObject> extends AbstractComponent<T> {

  static _inc = 0;


  data: DataContainer<any>;

  inc = 0;

  private _defaultValue: any = null;

  _value: any = null;


  construct() {
    this.inc = AbstractFormComponent._inc++;
  }

  get id() {
    return this.getInstance()?.id;
  }


  get name() {
    return this.getInstance()?.name;
  }


  get label() {
    return this.getInstance()?.label;
  }


  get labelDisplay() {
    return this.context.get('labelDisplay', 'top');
  }


  get help() {
    return this.getInstance()?.help;
  }


  get isReadOnly() {
    return this.getInstance()?.isReadonly() ? 'readonly' : null;
  }


  get isValid() {
    return this.data.checked(this.name) && this.data.valid(this.name);
  }

  get defaultValue() {
    return this._defaultValue;
  }

  setDefaultValue(v: any) {
    this._defaultValue = v;
  }


  protected setFormObject(elem: T) {
    this.setInstance(elem);
  }


  setData(elem: T, parent: Context, idx: number = -1) {
    this.setFormObject(elem);
    if (parent) {
      this.context = parent.child(elem.name, idx);
    } else {
      this.context = new Context();
      if (elem.getBinding().baseType === XS_TYPE_PROPERTY) {
        this.context.name = elem.name;
        this.context.idx = idx;
      }
    }
  }

  getValue() {
    const path = this.context.path();
    return _.get(this.data.instance, path, null);
  }

  setValue(v: any) {
    const path = this.context.path();
    return _.set(this.data.instance, path, v);
  }

  get value() {
    if (this._value) {
      return this._value;
    } else {
      this._value = this.getValue();
      if (this._value) {
        const binding = this.getInstance().getBinding();
        if (binding.isEntityReference()) {
          if (_.isArray(this._value)) {
            this._value = this._value.map(v =>
              UrlHelper.buildLookupConditions((<ClassRef>binding.getTargetRef()).getEntityRef(), v) + '');
          } else {
            const cond = UrlHelper.buildLookupConditions((<ClassRef>binding.getTargetRef()).getEntityRef(), this._value);
            this._value = [cond];
          }
        } else if (binding.isCollection()) {
          if (this._value) {
            if (!_.isArray(this._value)) {
              this._value = [this._value];
            }
          }
        }
      }
    }
    return this._value;
  }


  set value(v: any) {
    this._value = v;
    const binding = this.getInstance().getBinding();
    if (binding.isEntityReference()) {
      let data = [];
      if (_.isArray(v)) {
        data = v;
      } else {
        data = [v];
      }
      let refs = data.map(v => Expressions.parseLookupConditions(((<ClassRef>binding.getTargetRef()).getEntityRef()), v));
      if (!binding.isCollection()) {
        refs = refs.shift();
      }
      this.setValue(refs);
    } else {
      if (binding.isCollection()) {
        if (_.isArray(v)) {
          this.setValue(v);
        } else {
          this.setValue([v]);
        }
      } else {
        if (_.isArray(v) && v.length === 1) {
          this.setValue(v[0]);
        } else {
          this.setValue(v);
        }
      }

    }
  }


  build(form: FormObject): AbstractComponent<T>[] {
    const comp: AbstractComponent<T>[] = [];
    form.getChildren().forEach(formObject => {
      if (isFormObject(formObject)) {

        const handle = this.getComponentRegistry().getOrCreateDef(formObject.type);
        if (handle && handle.component) {
          if (this.vc) {
            const factory = this.r.resolveComponentFactory(<any>handle.component);
            const ref = this.vc.createComponent(factory);
            const instance = <AbstractFormComponent<any>>ref.instance;
            instance.data = this.data;
            instance.setData(formObject, this.context);
            instance.build(formObject);
            comp.push(instance);
          } else {
            // console.error('No view content setted');
          }
        } else {
          throw new NoFormTypeDefinedError(formObject.type);
        }
      }
    });
    return comp;
  }

}
