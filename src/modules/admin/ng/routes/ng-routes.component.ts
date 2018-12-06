import {Component, OnInit} from '@angular/core';
import {NavEntry} from '../../../navigator/NavEntry';
import {NavigatorService} from '../../../navigator/navigator.service';

@Component({
  selector: 'ng-routes',
  templateUrl: './ng-routes.component.html'
})
export class NgRoutesComponent implements OnInit {

  entries: NavEntry[];

  constructor(private navigatorService: NavigatorService) {}

  ngOnInit() {
    this.entries = this.navigatorService.getEntries();

  }
}
