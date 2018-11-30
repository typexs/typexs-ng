import {Component, OnInit} from '@angular/core';
import {Property} from '@typexs/schema/libs/decorators/Property';
import {Entity} from '@typexs/schema/libs/decorators/Entity';
import {FormGrid} from '../../libs/forms/decorators/FormGrid';


export class Places {

  @Property({type: 'string', form: 'text'})
  country: string;

  @Property({type: 'string', form: 'text'})
  city: string;

  @Property(<any>{type: 'string', form: 'select', label: 'Continent', enum: 'continents'})
  continent: string;

  continents: string[] = ['Africa', 'Europa', 'Asia', 'Australia', 'North america', 'South america', 'Antarctica'];


}


@Entity()
export class GroupDemoObject01 {

  @FormGrid()
  @Property({type: Places, cardinality: 0})
  places: Places[];

}


@Component({
  selector: 'groupDemo',
  templateUrl: 'group-demo.component.html',

})
export class GroupDemoComponent implements OnInit {

  object01: any;

  result: any;

  ngOnInit() {
    this.object01 = new GroupDemoObject01();
  }


  onSubmit($event: any) {
    this.result = $event;
  }
}
