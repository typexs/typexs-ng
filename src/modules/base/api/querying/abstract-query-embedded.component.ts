import * as _ from 'lodash';
import {EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ClassType, IEntityRef, JS_DATA_TYPES, LookupRegistry, XS_TYPE_ENTITY} from 'commons-schema-api/browser';
import {IFindOptions, REGISTRY_TYPEORM} from '@typexs/base/browser';
import {And, ExprDesc, Expressions} from 'commons-expressions/browser';
import {IDTGridOptions} from '../../datatable/IDTGridOptions';
import {IGridColumn} from '../../datatable/IGridColumn';
import {C_PROPERTY, C_URL_PREFIX, CC_GRID_CELL_ENTITY_REFERENCE, CC_GRID_CELL_OBJECT_REFERENCE, CC_GRID_CELL_VALUE} from '../../constants';
import {IGridApi} from '../../datatable/IGridApi';
import {DatatableComponent} from '../../datatable/datatable.component';
import {IQueringService} from './IQueringService';
import {QueryAction} from './QueryAction';
import {IQueryParams} from '../../datatable/IQueryParams';
import {DEFAULT_DT_GRID_OPTIONS} from './Constants';
import {AbstractGridComponent} from '../../datatable/abstract-grid.component';
import {Helper} from './Helper';


/**
 * Storage query embedded component
 *
 * Possibilities:
 * - sorting
 * - filters
 * - extend/add specialized columns
 */
export class AbstractQueryEmbeddedComponent implements OnInit {

  @Input()
  get params() {
    return this._params;
  }

  set params(v: IQueryParams) {
    this._params = v;
    this.paramsChange.emit(this._params);
  }


  constructor(storageService: IQueringService) {
    this.queringService = storageService;
  }


  @Input()
  name: string;

  @Input()
  columns: IGridColumn[];

  @Input()
  registryName: string = REGISTRY_TYPEORM;

  @Input()
  limit = 25;

  @Input()
  options: IDTGridOptions = DEFAULT_DT_GRID_OPTIONS;

  @Input()
  freeQuery: any;

  @Output()
  freeQueryChange: EventEmitter<any> = new EventEmitter();

  _params: IQueryParams;

  @Output()
  paramsChange: EventEmitter<IQueryParams> = new EventEmitter();

  @Input()
  componentClass: ClassType<AbstractGridComponent>;

  entityRef: IEntityRef;

  error: any = null;

  @ViewChild('datatable', {static: true})
  datatable: DatatableComponent;

  private queringService: IQueringService;


  getQueryService() {
    return this.queringService;
  }

  applyInitialOptions() {
    if (this.options) {
      // set initial options
      this.params.offset = _.get(this.options, 'offset', 0);
      this.params.limit = _.get(this.options, 'limit', 25);
      if (_.has(this.options, 'sorting')) {
        this.params.sorting = _.get(this.options, 'sorting');
      }
    }
  }


  ngOnInit() {
    if (!this.params) {
      this.params = {};
    }

    this.applyInitialOptions();

    this.queringService.isLoaded().subscribe(x => {
      this.findEntityDef();
      this.initialiseColumns();

      // api maybe not loaded
      setTimeout(() => {
        this.doQuery(this.datatable.api());
      });
    });
  }


  findEntityDef() {
    if (!this.registryName) {
      return;
    }
    this.entityRef = LookupRegistry.$(this.registryName).find(XS_TYPE_ENTITY, (e: IEntityRef) => {
      return e.machineName === _.snakeCase(this.name);
    });

    if (!this.entityRef) {
      this.error = `Can't find entity type for ${this.name}.`;
    }
  }


  initialiseColumns() {
    if (!this.columns && !_.get(this.options, 'columnsOverride', false)) {
      this.columns = [];

      this.entityRef.getPropertyRefs().forEach(x => {

        const column: IGridColumn = {
          label: x.label(),
          field: x.name,
        };

        // add property reference to column definition
        _.set(column, C_PROPERTY, x);
        _.set(column, C_URL_PREFIX, this.queringService.getNgUrlPrefix());

        let cellRenderer: string = CC_GRID_CELL_VALUE;
        if (x.isEntityReference()) {
          cellRenderer = CC_GRID_CELL_ENTITY_REFERENCE;
        } else if (x.isReference()) {
          cellRenderer = CC_GRID_CELL_OBJECT_REFERENCE;
        }

        column.cellValueRenderer = cellRenderer;
        if (!x.isReference()) {
          column.sorting = true;
          const datatype = <JS_DATA_TYPES>x.getType();
          if (datatype) {
            switch (datatype.toLowerCase()) {
              case 'number':
                column.filter = true;
                column.filterType = 'equal';
                column.filterDataType = datatype;
                break;
              case 'text':
              case 'string':
                column.filter = true;
                column.filterType = 'contains';
                column.filterDataType = datatype;
                break;
            }
          }
        }
        this.columns.push(column);
      });

      if (this.options.columnsPostProcess) {
        this.options.columnsPostProcess(this.columns);
      }
    }
  }

  /**
   * Re-Query
   */
  requery() {
    this.doQuery(this.datatable.api());
  }


  onQueryAction(action: QueryAction) {
    this.datatable.api().reset();
    this.freeQuery = action.query;
    this.doQuery(this.datatable.api());
  }


  doQuery(api: IGridApi): void {
    let executeQuery: any = null;
    let mangoQuery: ExprDesc = null;
    const filterQuery: ExprDesc[] = [];

    if (api.params && !_.isEmpty(api.params.filters)) {
      _.keys(api.params.filters).map(k => {
        if (!_.isEmpty(api.params.filters[k])) {
          filterQuery.push(api.params.filters[k]);
        }
      });
    }

    if (this.freeQuery) {
      mangoQuery = Expressions.fromJson(this.freeQuery);
      if (!_.isEmpty(mangoQuery)) {
        filterQuery.push(mangoQuery);
      }
    }

    if (filterQuery.length > 1) {
      mangoQuery = And(...filterQuery);
    } else if (filterQuery.length === 1) {
      mangoQuery = filterQuery.shift();
    } else {
      mangoQuery = null;
    }

    if (mangoQuery) {
      executeQuery = mangoQuery.toJson();
    }

    const queryOptions: IFindOptions = {};
    if (this.options.queryOptions) {
      _.assign(queryOptions, this.options.queryOptions);
    }
    _.assign(queryOptions, {
      offset: api.params.offset,
      limit: api.params.limit
    });

    if (!_.isEmpty(api.params.sorting)) {
      queryOptions.sort = api.params.sorting;
    }

    const mode = this.options.queryType === 'aggregate' ? 'aggregate' : 'query';
    if (mode === 'query') {
      this.queringService.query(this.name, executeQuery, queryOptions)
        .subscribe(
          (results: any) => {
            if (results) {
              if (results.entities && _.has(results, '$count') && _.isNumber(results.$count)) {
                // if (!_.get(this.options, 'columnsOverride', false)) {
                if (!this.entityRef) {
                  this.rebuildColumns(results.entities, api);
                  // const columns = Helper.rebuildColumns(results.entities);
                  // api.setColumns(columns);
                }
                // }
                api.setRows(results.entities);
                api.setMaxRows(results.$count);
                api.rebuild();
              }
            }
          }
        );
    } else {
      this.queringService.aggregate(this.name, executeQuery, queryOptions)
        .subscribe(
          (results: any) => {
            if (results) {
              if (results.entities && _.has(results, '$count') && _.isNumber(results.$count)) {
                this.rebuildColumns(results.entities, api);
                // if (!_.get(this.options, 'columnsOverride', false)) {
                //   const columns = Helper.rebuildColumns(results.entities);
                //   api.setColumns(columns);
                // }
                api.setRows(results.entities);
                api.setMaxRows(results.$count);
                api.rebuild();
              }
            }
          }
        );
    }
  }


  private rebuildColumns(entities: any[], api: IGridApi) {
    if (!_.get(this.options, 'columnsOverride', false)) {
      const columns = Helper.rebuildColumns(entities);
      if (this.options.columnsPostProcess) {
        this.options.columnsPostProcess(this.columns);
      }
      api.setColumns(columns);
    }
  }


  reset() {
    this.params.offset = 0;
  }

}
