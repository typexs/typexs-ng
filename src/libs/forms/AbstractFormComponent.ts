import {DataContainer} from 'typexs-schema/libs/DataContainer';

import * as _ from 'lodash';
import {PropertyDef} from 'typexs-schema/libs/registry/PropertyDef';

import {NoFormTypeDefinedError} from '../../libs/exceptions/NoFormTypeDefinedError';
import {AbstractComponent} from '../views/AbstractComponent';
import {FormObject, isFormObject} from './FormObject';
import {ContentComponentRegistry} from '../views/ContentComponentRegistry';
import {Context} from '../views/Context';


export abstract class AbstractFormComponent<T extends FormObject> extends AbstractComponent<T> {

  static _inc: number = 0;


  data: DataContainer<any>;

  inc: number = 0;



  construct(){
    this.inc = AbstractFormComponent._inc++;
  }

  get id() {
    return this.elem.id;
  }


  get name() {
    return this.elem.name;
  }


  get label() {
    return this.elem.label;
  }


  get labelDisplay() {
    return this.context.get('labelDisplay', 'top');
  }


  get help() {
    return this.elem.help;
  }


  get isReadOnly() {
    return this.elem.readonly;
  }


  get isValid() {
    return this.data.checked(this.name) && this.data.valid(this.name);
  }


  protected setFormObject(elem: T) {
    this.setElem(elem);
  }


  setData(elem: T, parent: Context, idx: number = -1) {
    this.setFormObject(elem);
    if (parent) {
      this.context = parent.child(elem.name, idx);
    } else {
      this.context = new Context();
      if (elem.getBinding() instanceof PropertyDef) {
        this.context.name = elem.name;
        this.context.idx = idx;
      }
    }
  }

  _value:any = null;


  get value() {
    if(this._value){
      return this._value;
    }else{
      let path = this.context.path();
      this._value = _.get(this.data.instance, path, null);
      if(this._value){
        let binding = this.elem.getBinding();
        if(binding.isEntityReference()) {
          if(_.isArray(this._value)){
            this._value = this._value.map(v => binding.targetRef.getEntity().buildLookupConditions(v)+'');
          }else{
            let cond = binding.targetRef.getEntity().buildLookupConditions(this._value);
            this._value = [cond];
          }
        }
      }
    }
    return this._value;
    /*
    let path = this.context.path();
    let binding = this.elem.getBinding();
    if(binding.isEntityReference()){
      let refs = _.get(this.data.instance, path, null);
      if(refs){
        console.log('get',refs)
        if(_.isArray(refs)){
          refs = refs.map(v => binding.targetRef.getEntity().buildLookupConditions(v)+'');
        }else{
          let cond = binding.targetRef.getEntity().buildLookupConditions(refs)+'';
          console.log('get',cond);
          refs = [cond];
        }
      }
      return refs;
    }else{
      return _.get(this.data.instance, path, null);
    }*/
  }


  set value(v: any) {
    this._value = v;

    let path = this.context.path();
    let binding = this.elem.getBinding();
    if(binding.isEntityReference()){
      let data = [];
      if(_.isArray(v)){
        data = v;
      }else{
        data = [v]
      }
      let refs = data.map(v => binding.targetRef.getEntity().createLookupConditions(v));
      if(!binding.isCollection()){
        refs = refs.shift();
      }
      _.set(this.data.instance, path, refs);
    }else{
      _.set(this.data.instance, path, v);
    }

  }


  build(form: FormObject) : AbstractComponent<T>[] {
    let comp:AbstractComponent<T>[] = []
    form.getChildren().forEach(formObject => {
      if (isFormObject(formObject)) {

        let handle = ContentComponentRegistry.$().getOrCreateDef(formObject.type);
        if (handle && handle.component) {
          if (this.vc) {
            let factory = this.r.resolveComponentFactory(<any>handle.component);
            let ref = this.vc.createComponent(factory);
            let instance = <AbstractFormComponent<any>>ref.instance;
            instance.data = this.data;
            instance.setData(formObject, this.context);
            instance.build(formObject);
            comp.push(instance);
          } else {
            console.error('No view content setted');
          }
        } else {
          throw new NoFormTypeDefinedError(formObject.type);
        }
      }
    });
    return comp;
  }

}
