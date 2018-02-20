import {suite, test, timeout} from "mocha-typescript";
import * as fs from "fs";
import {expect} from 'chai';
import {Bootstrap, PlatformUtils, SchematicsExecutor} from "typexs-base";


@suite('functional/commands/ng_app')
class GeneralSpec {


  static async after() {
    let directory = __dirname + '/build';
    try {
       await PlatformUtils.deleteDirectory(directory);
    } catch (e) {
    }
  }


  @test @timeout(20000)
  async 'create new app'() {

    let directory = __dirname + '/build/output';
    try {
      await PlatformUtils.deleteDirectory(directory);
    } catch (e) {
    }
    PlatformUtils.mkdir(directory);

    let _argv = {
      name: 'ng-test',
      directory: 'ng-app',
      skipGit: true
    }

    let executor = new SchematicsExecutor({
      workdir: directory,
      basedir: directory,
      collectionName: __dirname + '/../../../src/packages/@schematics/typexs-ng',
      schematicName: 'ng-app',
      argv: _argv
    });

    try {
      await executor.run();
    } catch (e) {
      console.error(e);
    }

    expect(fs.existsSync(directory + `/${_argv.directory}/karma.conf.js`)).to.be.true;
    expect(fs.existsSync(directory + `/${_argv.directory}/src/modules/app/app.module.ts`)).to.be.true;
    expect(fs.existsSync(directory + `/${_argv.directory}/src/app/main.ts`)).to.be.true;

  }

  @test
  async 'upgrade project'() {

    let directory = __dirname + '/build/output/ng-app';
    if (!fs.existsSync(directory)) {
      await this['create new app']();
    }

    try {
      fs.unlinkSync(directory + '/gulpfile.ts');
      fs.unlinkSync(directory + '/karma.conf.js');
    } catch (e) {
    }


    let _argv = {
      name: 'ng-test',
      directory: 'ng-app',
      skipGit: true
    }

    let executor = new SchematicsExecutor({
      workdir: directory,
      basedir: directory,
      collectionName: __dirname + '/../../../src/packages/@schematics/typexs-ng',
      schematicName: 'ng-app',
      argv: _argv
    });

    try {
      await executor.run();
    } catch (e) {
      // console.error(e);
    }


    expect(fs.existsSync(directory + '/karma.conf.js')).to.be.true;
    expect(fs.existsSync(directory + '/src/modules/app/app.module.ts')).to.be.true;
    expect(fs.existsSync(directory + '/src/app/main.ts')).to.be.true;


  }


}

