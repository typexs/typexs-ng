
import {suite, test, timeout} from "mocha-typescript";
import {NgAppCommand} from "../../../src/commands/NgApp";
import {Bootstrap} from "typexs-base";


@suite('functional/commands/ng_app')
class GeneralSpec {



  before() {
    Bootstrap.reset();

  }

  after() {
    Bootstrap.reset();
  }

  @test @timeout(20000)
  async 'try be schematics'() {
    let bts = await Bootstrap.configure({
      app:{
        name: 'project',
        path: __dirname+'/project'
      }
    }).activateErrorHandling()
    let cmd = new NgAppCommand();

    await cmd.handler({op:'new2'})


  }


  @test @timeout(20000)
  async 'try be init task'() {
    let bts = await Bootstrap.configure({
      app:{
        name: 'project',
        path: __dirname+'/project'
      }
    }).activateErrorHandling()
    let cmd = new NgAppCommand();

    await cmd.handler({op:'new'})


  }
}

