import {IQueryParams} from './IQueryParams';

export interface IGridApi {

  params: IQueryParams;

  rebuild(): void;

  setRows(rows: any[]): void;

  setMaxRows(maxRows: number): void;

  reset(): void;
}
