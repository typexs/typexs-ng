import {Injectable} from '@angular/core';
import {EntityService} from './entity.service';
import {PropertyDef} from '@typexs/schema/libs/registry/PropertyDef';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {ISelectOptionsService} from '../forms/libs/ISelectOptionsService';
import {ISelectOption} from '../forms/libs/ISelectOption';


@Injectable()
export class EntityOptionsService implements ISelectOptionsService {


  constructor(private entityService: EntityService) {
  }


  options(propertyDef: PropertyDef, limit: number = 25, page: number = 0): Observable<ISelectOption[]> {
    let bs = new BehaviorSubject<ISelectOption[]>(null);
    if (propertyDef.targetRef.isEntity) {
      let entityDef = propertyDef.targetRef.getEntity();
      this.entityService.query(entityDef.machineName, null, {limit: limit}).subscribe(
        result => {
          if (result) {
            let _entities: ISelectOption[] = [];

            if (result.entities) {
              result.entities.forEach((e: any) => {
                let option: ISelectOption = {};
                option.value = entityDef.buildLookupConditions(e);
                option.label = entityDef.label(e);
                _entities.push(option);
              });
            }

            bs.next(_entities);
          }
        },
        (e: Error) => {
          console.error(e);
        },
        () => {
          bs.complete();
        }
      );
    } else {
      bs.error(new Error('no entity as target in property'));
    }

    return bs.asObservable();

  }


}
