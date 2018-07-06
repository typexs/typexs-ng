import {Component, OnInit} from '@angular/core';
import {AuthVariant, LocalAuthVariant, XSUserTest} from './xstest.defs';
import {Registry} from 'typexs-schema';




@Component({
  selector: 'xstest',
  templateUrl: 'xstest.component.html',

})
export class XSTestComponent implements OnInit {

  userLogin: any;

  ngOnInit() {
    this.userLogin = new XSUserTest();

    let variant = new LocalAuthVariant();
    variant.label = 'Google';
    variant.icon = null;
    variant.type = 'oauth2';
    this.userLogin.variants.push(variant);

    let variant2 = new AuthVariant();
    variant.label = 'Google';
    variant.icon = null;
    variant.type = 'oauth2';
    this.userLogin.variants.push(variant);

    variant2 = new AuthVariant();
    variant.label = 'Facebook';
    variant.icon = null;
    variant.type = 'oauth2';
    this.userLogin.variants.push(variant);







    /**
     *
     * username
     *
     * password
     *
     *
     * other selection methods
     *
     * - facebook
     *
     * - google
     *
     * - saml
     *
     */


/*
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
    */
    /*
    let form = new XsForm('user')
    form.add()
    */


  }

}
