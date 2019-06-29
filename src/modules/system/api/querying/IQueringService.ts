import {Observable} from 'rxjs/Observable';

export interface IQueringService {

  isReady(callback: Function): void;

  get(entityName: string, entityId: any, options?: any): Observable<any>;


  query(entityName: string, query?: any, options?: any): Observable<any>;


  save(entityName: string, entity: any, options?: any): Observable<any>;


  update(entityName: string, entityId: any, entity: any, options?: any): Observable<any>;


  delete(entityName: string, entityId: any, options?: any): Observable<any>;

  getNgUrlPrefix(): string;

}
