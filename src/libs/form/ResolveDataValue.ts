import {FormObject} from './FormObject';
import {Form} from './elements/Form';
import {IResolver} from './IResolver';

export class ResolveDataValue implements IResolver {

  private orgValue: string;

  private path: string[] = [];

  private fetchKey: string = null;

  private property: string = null;

  private object: FormObject = null;

  constructor(value: string, object: FormObject, property: string) {
    this.property = property;
    this.object = object;
    this.orgValue = value.replace(/^\$/, '');
    this.path = this.orgValue.split('.');
    this.fetchKey = this.path.pop();
  }

  get() {
    return this.orgValue;
  }


  resolve(form: Form) {
    let elem = form.get(this.path.join('.'));
    if (elem) {
      this.object[this.property] = elem[this.fetchKey];
      return elem[this.fetchKey];
    } else {
      throw new Error('cant resolve data');
    }

  }

}

