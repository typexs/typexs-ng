import {Injectable} from '@angular/core';
import {ISelectOptionsService} from '../../forms/libs/ISelectOptionsService';
import {ISelectOption} from '../../forms/libs/ISelectOption';
import {PropertyDef} from '@typexs/schema/libs/registry/PropertyDef';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class OptionsService implements ISelectOptionsService {

  favoredMusicTypes: ISelectOption[] = [
    {'label': 'Indie', 'value': 'indie'},
    {'label': 'Blues', 'value': 'Blues'}
  ];


  options(property: PropertyDef): Observable<ISelectOption[]> {
    return (new BehaviorSubject(this.favoredMusicTypes)).asObservable();
  }


}

