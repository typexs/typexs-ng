import {Injectable} from '@angular/core';
import {ISelectOptionsService} from '../../forms/libs/ISelectOptionsService';
import {ISelectOption} from '../../forms/libs/ISelectOption';
import {PropertyRef} from '@typexs/schema/libs/registry/PropertyRef';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class OptionsService implements ISelectOptionsService {

  favoredMusicTypes: ISelectOption[] = [
    {'label': 'Indie', 'value': 'indie'},
    {'label': 'Blues', 'value': 'Blues'}
  ];


  options(property: PropertyRef): Observable<ISelectOption[]> {
    return (new BehaviorSubject(this.favoredMusicTypes)).asObservable();
  }


}

