import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../admin.service';
import {NavEntry} from '../../../navigator/NavEntry';

@Component({
  selector: 'ng-routes',
  templateUrl: './ng-routes.component.html'
})
export class NgRoutesComponent implements OnInit {

  entries: NavEntry[];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    let service = this.adminService.getNavigatorService();
    this.entries = service.getEntries();

  }
}
