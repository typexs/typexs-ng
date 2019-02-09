import {Observable} from 'rxjs/Observable';
import {ISelectOption} from './ISelectOption';
import {IPropertyRef} from 'commons-schema-api/browser';


export interface ISelectOptionsService {

  options(property: IPropertyRef): Observable<ISelectOption[]>;

}
