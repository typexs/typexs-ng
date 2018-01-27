import {suite, test} from "mocha-typescript";
import {expect} from "chai";
import {Config, IFileConfigOptions, PlatformUtils} from "typexs-base";

@suite('functional/demo/general')
class GeneralSpec {

  before() {
    Config.clear();
  }

  after() {
    Config.clear();
  }


  @test
  async 'todo'() {
  }
}

