import {IGridColumn} from './IGridColumn';
import {EventEmitter, Input, Output} from '@angular/core';
import {IDTGridOptions} from './IDTGridOptions';
import {IQueryParams} from './IQueryParams';
import {IGridApi} from './IGridApi';


export abstract class AbstractGridComponent implements IGridApi {

  @Input()
  params: IQueryParams = {};

  @Output()
  paramsChange: EventEmitter<IQueryParams> = new EventEmitter<IQueryParams>();

  @Input()
  columns: IGridColumn[];

  @Input()
  rows: any[];

  @Input()
  maxRows: number;

  @Input()
  options: IDTGridOptions;

  @Output()
  doQuery: EventEmitter<IGridApi> = new EventEmitter<IGridApi>();

  @Output()
  gridReady: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.construct();
  }


  construct() {
  }


  rebuild() {
    this.gridReady.emit();
  }


  setRows(rows: any[]) {
    this.rows = rows;
  }

  setMaxRows(maxRows: number) {
    this.maxRows = maxRows;
  }

  // abstract query(): void;


}
