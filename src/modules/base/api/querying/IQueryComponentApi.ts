import {IEntityRef} from 'commons-schema-api/browser';
import {IQueringService} from './IQueringService';

export interface IQueryComponentApi {

  getEntityRef(): IEntityRef;

  getQueryService(): IQueringService;
}
