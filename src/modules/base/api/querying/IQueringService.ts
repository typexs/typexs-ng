import {Observable} from 'rxjs/Observable';

export interface IQueringService {

  /**
   * isReady checks if metadata is loaded and executes callback after
   *
   * @param callback
   */
  isReady(callback: Function): void;

  /**
   * isReady checks if metadata is loaded and publishes state on Obervable
   *
   */
  isReady(): Observable<boolean>;

  get(entityName: string, entityId: any, options?: any): Observable<any>;


  query(entityName: string, query?: any, options?: any): Observable<any>;

  aggregate(entityName: string, aggregate?: any, options?: any): Observable<any>;

  save(entityName: string, entity: any, options?: any): Observable<any>;


  update(entityName: string, entityId: any, entity: any, options?: any): Observable<any>;


  delete(entityName: string, entityId: any, options?: any): Observable<any>;


  getNgUrlPrefix(): string;

}
