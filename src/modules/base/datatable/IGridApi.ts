import {IQueryParams} from './IQueryParams';
import {IGridColumn} from './IGridColumn';

export interface IGridApi {

  params: IQueryParams;

  rebuild(): void;

  setColumns(columns: IGridColumn[]): void;

  setRows(rows: any[]): void;

  setMaxRows(maxRows: number): void;

  reset(): void;
}
