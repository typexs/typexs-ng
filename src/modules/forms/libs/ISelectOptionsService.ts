import {PropertyRef} from '@typexs/schema';
import {Observable} from 'rxjs/Observable';
import {ISelectOption} from './ISelectOption';


export interface ISelectOptionsService {

  options(property: PropertyRef): Observable<ISelectOption[]>;

}
