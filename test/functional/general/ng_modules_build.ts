import {suite, test} from "mocha-typescript";
import {expect} from "chai";
import * as _ from 'lodash';
import {Bootstrap, Config, IFileConfigOptions, PlatformUtils, ClassesLoader, Container} from "typexs-base";
import {C_NG_MODUL} from "../../../src/types";
import {NgMetaDataCollector} from "../../../src/libs/angular/NgMetaDataCollector";
import {NgModuleBuilder} from "../../../src/libs/angular/NgModuleBuilder";

@suite('functional/general/ng_modules_build')
class GeneralSpec {

  before() {
    Bootstrap.reset();

  }

  after() {
    Bootstrap.reset();
  }


  @test
  async 'collect ngModules'() {

    let bts = Bootstrap._().configure({
      app: {path: __dirname + '/fake_apps/coolapp'},
      modules: {
        libs: [{
          topic: C_NG_MODUL,
          refs: ['src/modules/*/*.module.*']
        }]
      }
    });

    bts = await bts.prepareRuntime();
    let loader = bts.getLoader();
    let classes = loader.getClasses(C_NG_MODUL);
    expect(classes).to.have.length(3);

    let ngmd = Container.get(NgMetaDataCollector);
    await ngmd.prepare();

    let ngms = ngmd.modules;
    expect(ngms).to.have.length(3);
    expect(_.map(ngms, n => n.name)).to.deep.eq(['AppModule', 'ContactModule', 'TodoModule']);
  }


  @test
  async 'build AppModule'() {
    let bts = Bootstrap._().configure({
      ng: {generated: './readRoutes/ng-app'},
      app: {path: __dirname + '/fake_apps/coolapp'},
      modules: {
        libs: [{
          topic: C_NG_MODUL,
          refs: [
            'app/modules/*/*.module.*'
          ]
        }]
      }
    });

    bts = await bts.prepareRuntime();
    let loader = bts.getLoader();

    let ngmd = Container.get(NgMetaDataCollector);
    await ngmd.prepare();

    let ngms = ngmd.modules;


    let appPath = bts.getAppPath();
    let generated = Config.get('ng.generated', '.');
    generated = PlatformUtils.join(appPath, generated, 'app.module.ts');

    let builder = new NgModuleBuilder();
    builder
      .file(generated)
      .selfPackageName('project')
      .addModules(ngms);

    let str = builder.build();
    console.log(str);


    // builder.
  }
}

