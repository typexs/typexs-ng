import {IDTGridOptions} from '../../base/datatable/IDTGridOptions';

export const DEFAULT_DS_OPTIONS: IDSOptions = {
  pagerId: 'page',
  enablePager: true,
  limit: 25,
  freeQueryBuilder: true,
  entityTypeSelection: true
};

/**
 * Options for distributed storage table view
 */
export interface IDSOptions extends IDTGridOptions {

  /**
   * Disable / enable input for entity type
   */
  entityTypeSelection?: boolean;

}
