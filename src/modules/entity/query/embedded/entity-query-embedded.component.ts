import {ChangeDetectorRef, Component} from '@angular/core';
import {AbstractQueryEmbeddedComponent} from '../../../base/api/querying/abstract-query-embedded.component';

import {EntityService} from '../../entity.service';
import {C_DEFAULT} from '../../../base/constants';
import {EntityRegistry} from '@typexs/schema/browser';


/**
 * Storage query embedded component
 *
 * Possibilities:
 * - sorting
 * - filters
 * - extend/add specialized columns
 */
@Component({
  selector: 'txs-entity-query-embedded',
  templateUrl: './entity-query-embedded.component.html',
  styleUrls: ['./entity-query-embedded.component.scss']
})
export class EntityQueryEmbeddedComponent extends AbstractQueryEmbeddedComponent {

  constructor(private entityService: EntityService) {
    super(entityService);
    this.registryName = C_DEFAULT;
  }

  findEntityDef() {
    this.entityRef = EntityRegistry.$().getEntityRefByName(this.machineName);

    if (!this.entityRef) {
      this.error = `Can't find entity type for ${this.machineName}.`;
    }
  }


  //   initialiseColumns() {
  //   if (!this.columns) {
  //     this.columns = [];
  //
  //     this.entityRef.getPropertyRefs().forEach(x => {
  //
  //       const column: IGridColumn = {
  //         label: x.label(),
  //         field: x.name,
  //       };
  //
  //       // add property reference to column definition
  //       _.set(column, C_PROPERTY, x);
  //       _.set(column, C_URL_PREFIX, this.storageService.getNgUrlPrefix());
  //
  //       let cellRenderer: string = CC_GRID_CELL_VALUE;
  //       if (x.isEntityReference()) {
  //         cellRenderer = CC_GRID_CELL_ENTITY_REFERENCE;
  //       } else if (x.isReference()) {
  //         cellRenderer = CC_GRID_CELL_OBJECT_REFERENCE;
  //       }
  //
  //       column.cellValueRenderer = cellRenderer;
  //       if (!x.isReference()) {
  //         column.sorting = true;
  //         const datatype = <JS_DATA_TYPES>x.getType().toLowerCase();
  //         switch (datatype) {
  //           case 'number':
  //             column.filter = true;
  //             column.filterType = 'equal';
  //             column.filterDataType = datatype;
  //             break;
  //           case 'text':
  //           case 'string':
  //             column.filter = true;
  //             column.filterType = 'contains';
  //             column.filterDataType = datatype;
  //             break;
  //         }
  //       }
  //
  //       this.columns.push(column);
  //     });
  //
  //     if (this.options.columnsPostProcess) {
  //       this.options.columnsPostProcess(this.columns);
  //     }
  //   }
  // }

}

// export class StorageQueryEmbeddedComponent implements OnInit /*, OnDestroy */ {
//
//   @Input()
//   machineName: string;
//
//   @Input()
//   columns: IGridColumn[];
//
//   @Input()
//   registryName: string = REGISTRY_TYPEORM;
//
//   @Input()
//   limit = 25;
//
//   @Input()
//   options: IGridOptions = {
//     pagerId: 'page',
//     enablePager: true,
//     limit: 25
//   };
//
//   entityRef: IEntityRef;
//
// //  entities: any[] = [];
//
//   _freeQuery: any = null;
//
//   error: any = null;
//
//
//   @ViewChild('datatable')
//   datatable: DatatableComponent;
//
//   constructor(private storageService: StorageService) {
//   }
//
//
//   ngOnInit() {
//     this.storageService.isReady(() => {
//       this.findEntityDef();
//       this.initialiseColumns();
//
//       // api maybe not loaded
//       setTimeout(() => {
//         this.doQuery(this.datatable.api());
//       });
//
//     });
//   }
//
//
//   findEntityDef() {
//     this.entityRef = LookupRegistry.$(this.registryName).find(XS_TYPE_ENTITY, (e: IEntityRef) => {
//       return e.machineName === _.snakeCase(this.machineName);
//     });
//
//     if (!this.entityRef) {
//       this.error = `Can't find entity type for ${this.machineName}.`;
//     }
//   }
//
//
//
//   onQueryAction(action: StorageQueryAction) {
//     this._freeQuery = action.query;
//     this.doQuery(this.datatable.api());
//   }
//
//
//   doQuery(api: IGridApi): void {
//     let executeQuery: any = null;
//     let mangoQuery: ExprDesc = null;
//     const filterQuery: ExprDesc[] = [];
//
//     if (!_.isEmpty(api.params.filters)) {
//       _.keys(api.params.filters).map(k => {
//         if (!_.isEmpty(api.params.filters[k])) {
//           filterQuery.push(api.params.filters[k]);
//         }
//       });
//     }
//
//     if (this._freeQuery) {
//       mangoQuery = Expressions.fromJson(this._freeQuery);
//       if (!_.isEmpty(mangoQuery)) {
//         filterQuery.push(mangoQuery);
//       }
//     }
//
//     if (filterQuery.length > 1) {
//       mangoQuery = And(...filterQuery);
//     } else if (filterQuery.length === 1) {
//       mangoQuery = filterQuery.shift();
//     } else {
//       mangoQuery = null;
//     }
//
//     if (mangoQuery) {
//       executeQuery = mangoQuery.toJson();
//     }
//
//
//     const queryOptions: IFindOptions = {
//       offset: api.params.offset,
//       limit: api.params.limit
//     };
//
//     if (!_.isEmpty(api.params.sorting)) {
//       queryOptions.sort = api.params.sorting;
//     }
//
//     this.storageService.query(this.machineName, executeQuery, queryOptions)
//       .subscribe(
//         (results: any) => {
//           if (results) {
// //            this.entities = results.entities;
//             api.setRows(results.entities);
//             api.setMaxRows(results.$count);
//             api.rebuild();
//           }
//         }
//       );
//
//   }
//
// }
