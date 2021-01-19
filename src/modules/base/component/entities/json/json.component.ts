import {Component} from '@angular/core';
import {AbstractEntityViewComponent} from '../abstract-entity-view.component';


@Component({
  selector: 'txs-simple-json',
  templateUrl: 'json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent extends AbstractEntityViewComponent<any> {

}
