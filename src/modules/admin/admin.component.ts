import {Component, ViewEncapsulation} from '@angular/core';
import {AdminService} from './admin.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent  {

  constructor(private adminInitService: AdminService) {

  }


}
