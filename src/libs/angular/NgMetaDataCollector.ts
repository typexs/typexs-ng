import {Config, ClassesLoader, Inject, RuntimeLoader, PlatformUtils} from "typexs-base";
import {C_NG_MODULE} from "../../types";

import {INgModuleDef} from "./INgModuleDef";


export class NgMetaDataCollector {

  @Inject(RuntimeLoader.name)
  loader: RuntimeLoader;

  private _ngModules: INgModuleDef[] = [];


  get modules(){
    return this._ngModules;
  }

  prepare() {
    this.collectNgModules();
  }


  collectNgModules() {
    let clazzes = this.loader.getClasses(C_NG_MODULE);
    this._ngModules = []
    for (let clazz of clazzes) {
      let source = ClassesLoader.getSource(clazz);
      let modul = ClassesLoader.getModulName(clazz);

      let ngModule: INgModuleDef = {
        module: modul,
        name: clazz.name,
        clazz: clazz,
        source: source
      }
      this._ngModules.push(ngModule)
    }
    return this.modules;
  }
}
