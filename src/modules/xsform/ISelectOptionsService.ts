import {PropertyDef} from 'typexs-schema';
import {Observable} from '../../../node_modules/rxjs';

export interface ISelectOption {
  label?:string;
  value?:string;
}

export interface ISelectOptionsService {

  options(property: PropertyDef): Observable<ISelectOption[]>;

}
