import {Component, Injectable, OnInit} from '@angular/core';
import {Property} from 'typexs-schema/libs/decorators/Property';
import {Entity} from 'typexs-schema/libs/decorators/Entity';
import {MaxLength, MinLength, IsEmail} from 'class-validator';
import {EqualWith} from '../../libs/validators/EqualWith';


export class Places {

  @Property({type: 'string', form: 'text'})
  country: string;

  @Property({type: 'string', form: 'text'})
  city: string;

}


@Entity()
export class GroupDemoObject01 {

  @Property({targetClass: Places, cardinality: 0, form: 'grid'})
  places: Places[];

}


@Component({
  selector: 'groupDemo',
  templateUrl: 'group-demo.component.html',

})
export class GroupDemoComponent implements OnInit {

  object01: any;

  ngOnInit() {
    this.object01 = new GroupDemoObject01();
  }

}
