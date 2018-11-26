import {Component, ViewEncapsulation} from '@angular/core';
import {AdminService} from './admin.service';
import {IUser} from '../../libs/api/auth/IUser';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent {

  constructor(private adminInitService: AdminService) {

  }


  getUser(): Promise<IUser> {
    return <Promise<IUser>>this.adminInitService.getAuthService().getUser();
  }


}
