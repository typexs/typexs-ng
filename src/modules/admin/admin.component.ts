import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IUser} from '../../libs/api/auth/IUser';
import {AuthService} from '../system/api/auth/auth.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {


  user: IUser;

  constructor(private authService: AuthService) {
  }


  async getUser(): Promise<IUser> {
    return await this.authService.getUser();

  }

  async ngOnInit() {
    try{
      this.user = await this.getUser();
    }catch (e) {
      console.error(e);
    }


  }

}
