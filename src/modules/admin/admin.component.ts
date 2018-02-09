import {Component} from "@angular/core";
import {NgRoute} from "../../decorators/NgRoute";

@NgRoute({
  path:'admin',
  data:{
    label: 'Admin'
  }
})
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {


}
