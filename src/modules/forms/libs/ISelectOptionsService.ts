import {PropertyDef} from '@typexs/schema';
import {Observable} from 'rxjs/Observable';
import {ISelectOption} from './ISelectOption';


export interface ISelectOptionsService {

  options(property: PropertyDef): Observable<ISelectOption[]>;

}
