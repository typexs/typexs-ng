import {Component, Input} from '@angular/core';
import {IInstanceableComponent} from '../IInstanceableComponent';


@Component({
  selector: 'txs-simple-json',
  templateUrl: 'json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent implements IInstanceableComponent<any> {

  @Input()
  instance: any;

  getInstance(): any {
    return this.instance;
  }

  setInstance(instance: any) {
    this.instance = instance;
  }
}
