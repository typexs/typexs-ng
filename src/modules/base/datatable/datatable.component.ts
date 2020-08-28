import * as _ from 'lodash';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AbstractGridComponent} from './abstract-grid.component';
import {AppService} from '../app.service';
import {C_DEFAULT, CC_GRID} from '../constants';


const inputKeys = ['columns', 'rows', 'maxRows', 'options', 'params'];
const outputKeys = ['doQuery', 'gridReady', 'paramsChange'];

/**
 * Wrapper component for different grid implementiations
 *
 * - static variant when rows are given
 */
@Component({
  selector: 'txs-datatable',
  templateUrl: 'datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent extends AbstractGridComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  component: any;

  @ViewChild('content', {read: ViewContainerRef, static: true})
  vc: ViewContainerRef;

  componentRef: ComponentRef<any>;


  constructor(@Inject(Injector) public injector: Injector,
              @Inject(ComponentFactoryResolver) public r: ComponentFactoryResolver,
              @Inject(AppService) public config: AppService) {
    super();
  }


  ngOnInit(): void {
    if (!this.component) {
      this.component = this.config.getComponentClass(C_DEFAULT, CC_GRID);
    }
    this.vc.clear();
    const factory = this.r.resolveComponentFactory(<any>this.component);
    this.componentRef = this.vc.createComponent(factory);


    // passing through input parameters
    for (const prop of inputKeys) {
      // instance[prop] = this[prop];
      try {
        const propDesc = Object.getOwnPropertyDescriptor(this, prop);
        if (propDesc) {
          // copy only if exists
          Object.defineProperty(this.api(), prop, propDesc);
        }
      } catch (e) {

      }
    }
    // passing through output eventemitter
    for (const prop of outputKeys) {
      (<EventEmitter<any>>this.api()[prop]).subscribe(
        (v: any) => (<EventEmitter<any>>this[prop]).emit(v),
        (error: any) => (<EventEmitter<any>>this[prop]).error(error),
        () => (<EventEmitter<any>>this[prop]).complete(),
      );
      // Object.defineProperty(instance, prop, Object.getOwnPropertyDescriptor(this, prop));
    }

    this.rebuild = this.api().rebuild.bind(this.api());
    this.setMaxRows = this.api().setMaxRows.bind(this.api());
    this.setRows = this.api().setRows.bind(this.api());


  }


  api() {
    return this.componentRef.instance;
  }

  /**
   * Pass changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.componentRef && this.componentRef.instance) {
      for (const key of _.keys(changes)) {
        this.componentRef.instance[key] = changes[key].currentValue;
        if (this.componentRef.instance[key + 'Change']) {
          this.componentRef.instance[key + 'Change'].emit(changes[key].currentValue);
        }
      }
      this.rebuild();
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

  }
}
