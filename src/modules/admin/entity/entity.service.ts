import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import * as _ from 'lodash';
import {EntityRegistry} from 'typexs-schema/libs/EntityRegistry';
import {EntityDef} from 'typexs-schema/libs/registry/EntityDef';
import {BehaviorSubject, Observable, Subject} from '../../../../node_modules/rxjs';


@Injectable()
export class EntityService {

  private entityDefs: EntityDef[] = [];

  private _isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.reloadMetadata();
  }


  isReady(): Observable<boolean> {
    return this._isReady.asObservable();
  }


  reloadMetadata() {
    this.http.get('api/metadata/entities').subscribe(
      (entities: Object) => {
        if (_.isArray(entities)) {
          this.entityDefs = [];
          EntityRegistry.reset();
          entities.forEach(entityDefJson => {
            let ed = EntityRegistry.fromJson(entityDefJson);
            this.entityDefs.push(ed);
          });
        }
        this._isReady.complete();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      });
  }


  getEntityDefs() {
    return this.entityDefs;
  }

  get(entityName: string, entityId: any) {
  }

  create(entityName: string, entity: any): Observable<any> {
    let entityDef = EntityRegistry.$().getEntityDefByName(entityName);
    let obs = new BehaviorSubject<any>(null);
    this.http.post('api/entity/' + entityName, entity).subscribe(
      (res: any) => {
        //let data = res.json();
        console.log(res);
        if(_.isArray(res)){
          throw new Error('TODO');

        }else{
          res = entityDef.build(res);
        }

        obs.next(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        obs.error(err);
      },
      () => {obs.complete()}

    );

    return obs.asObservable();
  }

  update(entityName: string, entityId: any, entity: any) {
  }

  delete(entityName: string, entityId: any) {
  }


}
