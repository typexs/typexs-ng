import {IGridColumn} from './IGridColumn';

export interface IDTGridOptions {

  /**
   * enable or disable pager
   */
  enablePager: boolean;

  /**
   * Pager id for uniq identification
   */
  pagerId?: string;

  /**
   * Rows to show per page
   */
  limit: number;

  /**
   * Initial offset
   */
  offset?: number;

  /**
   * Free Query builder
   */
  freeQueryBuilder?: boolean;

  /**
   * Define a function which can modify columns
   *
   * @param columns
   */
  columnsPostProcess?: (columns: IGridColumn[]) => void;

}
