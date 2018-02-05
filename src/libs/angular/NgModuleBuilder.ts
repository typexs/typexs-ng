import {relative} from 'path'
import * as tpl from "string-template";
import {PlatformUtils} from 'typexs-base';
import {INgModuleDef} from "./INgModuleDef";

export class NgModuleBuilder {


  private _file: string = PlatformUtils.join('.', 'build', 'ng-app', 'app.module.ts');

  private _name: string = 'AppModule';

  private _appName: string = '';

  private _content: string;

  private imports: any[] = [
    {
      elem: 'NgModule',
      from: '@angular/core'
    },
    {
      elem: 'BrowserModule',
      from: '@angular/platform-browser',
      type: 'imports'
    }
  ];


  selfPackageName(name: string) {
    this._appName = name;
    return this;
  }

  addModules(modules: INgModuleDef[]) {
    let dir = PlatformUtils.dirname(this._file);
    for (let modul of modules) {

      if (modul.module === this._appName) {
        // local path

        this.imports.push({
          elem: modul.name,
          source: relative(dir, modul.source).replace(/\.(j|t)s$/, ''),
          type: 'imports'
        })
      } else {
        // extern modul
        this.imports.push({
          elem: modul.name,
          from: modul.module,
          type: 'imports'
        })
      }
    }
  }


  file(filepath: string) {
    this._file = filepath;
    return this;
  }


  build() {
    let pattern_default = 'import { {elem} } from \'{source}{from}\';'

    let ng: any = {name: this._name, imports: []};
    let str: string[] | string = [];

    for (let _import of this.imports) {
      let out = tpl(pattern_default, _import);

      if (_import.type === 'imports') {
        ng.imports.push(_import.elem);
      }

      str.push(out);
    }

    str.push(tpl(
      '@NgModule({\n' +
      '  imports: [{imports}]\n' +
      '})\n' +
      'export class {name} { \n}', ng
    ));

    return str.join('\n');
  }


}
