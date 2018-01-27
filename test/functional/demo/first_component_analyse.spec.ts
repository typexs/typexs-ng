import 'reflect-metadata';
import 'zone.js';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

import {suite, test} from "mocha-typescript";
import {expect} from "chai";
import {Config, IFileConfigOptions, PlatformUtils} from "typexs-base";
import {FirstComponent} from "./project/src/components/first/app/first.component";


@suite('functional/demo/first_comp')
class GeneralSpec {

  @test
  async 'todo'() {
    let x = FirstComponent;
    let y = Reflect.getOwnMetadata('annotations', x);

    console.log(y, y[0].toString());

  }
}

