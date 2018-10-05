import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigatorService} from '../navigator/navigator.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit{

  constructor(private navigator: NavigatorService){

  }

  ngOnInit(){
    this.navigator.addGroupLabel(/admin\/system/,'System');
  }


}
