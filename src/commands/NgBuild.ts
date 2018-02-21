import {Config, Inject} from "typexs-base";
import {NgMetaDataCollector} from "../libs/angular/NgMetaDataCollector";
import {NgModuleBuilder} from "../libs/angular/NgModuleBuilder";


export class NgBuild {

  command = "ng build [op]";
  aliases = "ngb";
  describe = "Ng prebuild ";


  @Inject()
  collector: NgMetaDataCollector;


  builder(yargs: any) {
    return yargs
  }

  async handler(argv: any) {
    let appName = Config.get('app.name', 'dummy');
    let appPath = Config.get('app.path', '.');

    let modules = this.collector.collectNgModules();
    let builder = new NgModuleBuilder();
    builder.addModules(modules);

    let content = builder.build();
    console.log(content)


    await builder.save();
    /*
    let classes = this.loader.getClasses(C_NG_MODUL);
    console.log(classes);
    console.log(MetaArgs.key(K_NG_ROUTES));

    for(let cls of classes){
      console.log(cls+' '+ClassesLoader.getSource(cls)+' '+ClassesLoader.getModulName(cls))
    }

*/

  }
}
