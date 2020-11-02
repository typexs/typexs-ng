import {ChangeDetectorRef, Component} from '@angular/core';
import {MenuAccessService} from './MenuAccessService';


@Component({
  selector: 'menu-demo',
  templateUrl: 'menu-demo.component.html',
})
export class MenuDemoComponent {


  constructor(public mas: MenuAccessService, private cdRef: ChangeDetectorRef) {
    mas.change.asObservable().subscribe(x => {
      cdRef.detectChanges();
    });
  }

  has() {
    return this.mas && this.mas.has('menu-item-2.disabled') && this.mas.has('menu-item-2.show');
  }


}
