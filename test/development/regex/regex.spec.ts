import {suite, test, timeout} from "mocha-typescript";
import {expect} from "chai";
import * as diff from 'diff';
import * as fs from 'fs';
import {SimpleRegexCodeModifierHelper} from "../../../src/libs/schematics/CodeUpdateHelper";

@suite('development/regex')
class DiffSpec {


  @test @timeout(20000)
  async 'try'() {
    let exist  = fs.readFileSync(__dirname + '/data/gulpfile_org.ts').toString('utf-8');
    let localStr= fs.readFileSync(__dirname + '/data/gulpfile_add.ts').toString('utf-8');


    let updated = false;

    //localStr.match(/\([^}]*\).*{[^}]*}/)
    let out = SimpleRegexCodeModifierHelper.copyMethods(exist,localStr);

    expect(out).to.contain(
      '@Gulpclass()\nexport class Gulpfile {\n\n  @Task()\n  someTask(){\n\n  }\n\n\n  ' +
      '@Task()\n  someOtherTask(){\n\n  }\n\n\n  @Task()\n  ngPreBuild(){\n\n  }\n\n\n\n}\n');

    out = SimpleRegexCodeModifierHelper.copyImports(exist,localStr);

    expect(out).to.contain('import * as diff from "diff";\nimport * as gulp from "gulp";\nimport {SequenceTask} from "gulpclass";\nimport * as fs from "fs";');


  }


}

