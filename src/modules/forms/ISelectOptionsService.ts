import {PropertyDef} from '@typexs/schema';
import {Observable} from 'rxjs/Observable';

export interface ISelectOption {
  label?:string;
  value?:string;
}

export interface ISelectOptionsService {

  options(property: PropertyDef): Observable<ISelectOption[]>;

}
