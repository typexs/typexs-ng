import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {IGridColumn} from '../IGridColumn';
import {AppConfigService} from '../../app.config.service';
import {CC_GRID_CELL_VALUE, SIMPLE_TABLE} from '../../constants';


@Component({
  selector: 'txs-simple-html-cell',
  templateUrl: 'simple-html-cell.component.html'
})
export class SimpleHtmlCellComponent implements OnInit, OnDestroy {

  @Input()
  column: IGridColumn;

  @Input()
  row: any;

  @ViewChild('cell', {read: ViewContainerRef}) vc: ViewContainerRef;

  ref: ComponentRef<any>;

  constructor(@Inject(Injector) public injector: Injector,
              @Inject(AppConfigService) public config: AppConfigService,
              @Inject(ComponentFactoryResolver) public r: ComponentFactoryResolver) {
  }


  ngOnInit() {
    let ccName: string;
    if (this.column.cellValueRenderer) {
      ccName = this.column.cellValueRenderer;
    } else {
      ccName = CC_GRID_CELL_VALUE;
    }
    let cClass = this.config.getComponentClass(SIMPLE_TABLE, ccName);
    if (!cClass) {
      cClass = this.config.getComponentClass(SIMPLE_TABLE, CC_GRID_CELL_VALUE);
    }
    const factory = this.r.resolveComponentFactory(<any>cClass);
    this.ref = this.vc.createComponent(factory);
    this.ref.instance.column = this.column;
    this.ref.instance.row = this.row;
  }


  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.destroy();
    }

  }


}