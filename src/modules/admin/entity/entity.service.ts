import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import * as _ from 'lodash';
import {EntityRegistry} from 'typexs-schema/libs/EntityRegistry';
import {EntityDef} from 'typexs-schema/libs/registry/EntityDef';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IFindOptions} from 'typexs-schema/libs/framework/IFindOptions';


@Injectable()
export class EntityService {

  private entityDefs: EntityDef[] = [];

  private _isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _ready: boolean = false;

  constructor(private http: HttpClient) {
    this.reloadMetadata();
  }


  isReady(callback: () => void): void {
    if(this._ready){
      callback();
    }
    this._isReady.asObservable().subscribe(null, null, () => {
      callback();
    });;
  }


  reloadMetadata() {
    this._ready = false;
    this.http.get('api/metadata/entities').subscribe(
      (entities: Object) => {
        if (_.isArray(entities)) {
          this.entityDefs = [];
          entities.forEach(entityDefJson => {
            let ed = EntityRegistry.fromJson(entityDefJson);
            this.entityDefs.push(ed);
          });
        }
        this._isReady.complete();
        this._ready = true;
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
     let entityDef = EntityRegistry.$().getEntityDefByName(entityName);
    let obs = new BehaviorSubject<any>(null);
    this.http.get('api/entity/' + entityName+ '/' + entityId).subscribe(
      (res: any) => {
        if(res){
          let result = null;
          if(_.isArray(res)){
            result = res.map(r => entityDef.build(r));
          }else{
            result = entityDef.build(res);
          }

          obs.next(result);
        }



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

  query(entityName: string, query: any = null, options:IFindOptions = {}) {
    let entityDef = EntityRegistry.$().getEntityDefByName(entityName);
    let obs = new BehaviorSubject<any>(null);
    let queryParts = [];
    if(_.isPlainObject(query)){
      queryParts.push('query='+JSON.stringify(query));
    }
    if(_.isNumber(options.limit)){
      queryParts.push('limit='+options.limit)
    }
    if(_.isNumber(options.offset)){
      queryParts.push('offset='+options.offset)
    }
    if(_.isPlainObject(options.sort)){
      queryParts.push('sort='+JSON.stringify(options.sort))
    }

    let url = 'api/entity/' + entityName;
    if(queryParts.length > 0){
      url += '?'+queryParts.join('&');
    }
    console.log(url);
    this.http.get(url).subscribe(
      (res: any) => {
        if(res){
          let result = null;
          if(_.isArray(res)){
            result = res.map(r => entityDef.build(r));
          }else{
            result = entityDef.build(res);
          }
          obs.next(result);
        }
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

  create(entityName: string, entity: any): Observable<any> {
    let entityDef = EntityRegistry.$().getEntityDefByName(entityName);
    let obs = new BehaviorSubject<any>(null);
    this.http.post('api/entity/' + entityName, entity).subscribe(
      (res: any) => {
        //let data = res.json();
        console.log(res);

        let result = null;
        if(_.isArray(res)){
          result = res.map(r => entityDef.build(r));
        }else{
          result = entityDef.build(res);
        }

        obs.next(result);
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
    // TODO if empty entity ???
    let entityDef = EntityRegistry.$().getEntityDefByName(entityName);
    let id = entityDef.buildLookupConditions(entity);
    if(entityId != id){
      throw new Error('something is wrong');
    }
    let obs = new BehaviorSubject<any>(null);
    this.http.post('api/entity/' + entityName + '/' + entityId, entity).subscribe(
      (res: any) => {
        //let data = res.json();
        console.log(res);
        let result = null;
        if(_.isArray(res)){
          result = res.map(r => entityDef.build(r));
        }else{
          result = entityDef.build(res);
        }

        obs.next(result);
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

  delete(entityName: string, entityId: any) {
  }


}
