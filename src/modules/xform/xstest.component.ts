import {Component, OnInit} from '@angular/core';
import {XSUserTest} from './xstest.defs';
import {XsForm} from './xform.component';


@Component({
  selector: 'xstest',
  templateUrl: 'xstest.component.html',

})
export class XSTestComponent implements OnInit {

  user: any;

  ngOnInit() {
    this.user = new XSUserTest();


    let form: any = {
      name: 'test-form',
      type: 'form',
      styles: ['form-container'],

      children: [{
        type: 'tabs',
        children: [
          {
            type: 'tab',
            children: [{
              type: 'ref',
              property: '$this.username'
            }]
          },
          {
            type: 'tab',
            label: '$this.password.label',
            children: [{
              type: 'ref',
              property: '$this.password',
              label: 'PW' // overriding
            }]
          }
        ]
      }],

      children2: {
        $each:{
          path:'keys($this)',
          x:'x',
          do:{
            type:'tab',
            label: '$this[x].label',
            children: [{
              type: 'ref',
              property: '$this[x]',
              label: 'PW' // overriding
            }]
          }
        }
      }
    };
    /*
    let form = new XsForm('user')
    form.add()
    */


  }

}
