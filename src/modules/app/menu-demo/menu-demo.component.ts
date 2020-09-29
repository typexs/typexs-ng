import {Component} from '@angular/core';
import {MenuAccessService} from './MenuAccessService';


@Component({
  selector: 'menu-demo',
  templateUrl: 'menu-demo.component.html',
})
export class MenuDemoComponent {


  constructor(public mas: MenuAccessService) {
  }


}
