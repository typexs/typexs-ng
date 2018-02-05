import {suite, test, timeout} from "mocha-typescript";

import * as diff from 'diff';
import * as fs from 'fs';

@suite('dependencies/diff')
class DiffSpec {


  @test @timeout(20000)
  async 'try be schematics'() {

    let old = fs.readFileSync(__dirname + '/data/gulpfile_org.ts').toString('utf-8');
    let add = fs.readFileSync(__dirname + '/data/gulpfile_add.ts').toString('utf-8');


    let match:RegExpExecArray = null;
    let regex = /.*\w+\s*\([^\)]*\)\s*{[^}]*}/g;

    while ((match = regex.exec(old)) != null) {
      console.log(match);
    }

    /*
    while(match){
      let x = regex.exec(old);
      match = !x
      console.log(x,match)
    }
    */


    // let patch = diff.diffLines(old,add);
    // console.log(patch);

  }


}

