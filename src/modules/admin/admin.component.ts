import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AdminService} from './admin.service';
import {IUser} from '../../libs/api/auth/IUser';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {


  user: IUser;

  constructor(private adminInitService: AdminService) {

  }


  async getUser(): Promise<IUser> {
    return await this.adminInitService.getAuthService().getUser();

  }

  async ngOnInit() {
    this.user = await this.getUser();

  }

}
