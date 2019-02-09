import {AfterContentInit, Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';


/**
 * Need jquery, datatables.net
 *
 * see src/app/polyfills
 */
@Directive({
  selector: '[datatable]'
})
export class DataTableDirective implements OnDestroy, AfterContentInit {

  @Input()
  dtOptions: any = {
    paging: false,
    scrollX: '100%',
    scrollXInner: '100%'
  };

  @Input()
  dtTrigger: Subject<any>;

  dtInstance: Promise<any>;

  // Only used for destroying the table when destroying this directive
  private dt: any;

  constructor(private el: ElementRef) {

  }

  ngAfterContentInit(): void {
    if (this.dtTrigger) {
      this.dtTrigger.subscribe(() => {
        this.displayTable();
      });
    } else {
      this.displayTable();
    }
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.dt) {
      this.dt.destroy(true);
    }
  }

  reload(){
    if(this.dt){
      this.displayTable();
    }
  }

  private async displayTable() {
    try {
      const $ = require('jquery');
      this.dtInstance = new Promise((resolve, reject) => {
          Promise.resolve(this.dtOptions).then(dtOptions => {
            if ($.fn.DataTable) {
              setTimeout(() => {
                this.dt = (<any>$(this.el.nativeElement)).DataTable(dtOptions);
                resolve(this.dt);
              });
            }
          });
        }
      );
    } catch (e) {
      console.error('jquery not found, disabling datatables');
    }

  }
}
