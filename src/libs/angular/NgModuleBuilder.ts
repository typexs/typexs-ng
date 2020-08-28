import {relative} from 'path';
import * as tpl from 'string-template';
import {Config, FileUtils, PlatformUtils} from '@typexs/base';
import {INgModuleDef} from './INgModuleDef';

export class NgModuleBuilder {


  private _file: string;

  private _name: string = 'AppModule';

  private _appName: string = '';

  private _content: string;

  private imports: any[] = [
    {
      elem: 'APP_ROUTES',
      from: './app.entries'
    },
    {
      elem: 'BrowserModule',
      from: '@angular/platform-browser',
      type: 'imports'
    },
    {
      elem: 'RouterModule',
      from: '@angular/router'
    }, {
      elem: 'ModuleWithProviders',
      from: '@angular/core'
    }, {
      elem: 'Type',
      from: '@angular/core'
    }


  ];


  constructor(file: string = PlatformUtils.join('.', 'src', 'modules', 'app', 'app.used.modules.ts')) {
    const appPath = Config.get('app.path', '.');
    const _path = PlatformUtils.join(PlatformUtils.pathResolve(appPath), 'package.json');
    const json = require(_path);
    this._file = file;
    this.selfPackageName(json.name);
  }


  selfPackageName(name: string) {
    this._appName = name;
    return this;
  }

  addModules(modules: INgModuleDef[]) {
    const dir = PlatformUtils.dirname(this._file);
    for (const modul of modules) {

      if (modul.name === 'AppModule') {
        continue;
      }

      if (modul.module === this._appName) {
        // local path
        this.imports.push({
          elem: modul.name,
          source: relative(dir, modul.source).replace(/\.(j|t)s$/, ''),
          type: 'imports'
        });
      } else {
        // extern modul
        this.imports.push({
          elem: modul.name,
          from: modul.module,
          type: 'imports'
        });
      }
    }
  }


  file(filepath: string) {
    this._file = filepath;
    return this;
  }


  build() {
    const pattern_default = 'import { {elem} } from \'{source}{from}\';';

    const ng: any = {name: this._name, imports: []};
    const str: string[] | string = [
      '// generated by typexs-ng'];

    for (const _import of this.imports) {
      const out = tpl(pattern_default, _import);

      if (_import.type === 'imports') {
        ng.imports.push(_import.elem);
      }

      str.push(out);
    }

    str.push('');

    str.push('export const APP_MODULES : Array<Type<any> | ModuleWithProviders | any[]> = [');
    str.push('  ' + ng.imports.join(',\n  ') + ',');
    str.push('  RouterModule.forRoot(APP_ROUTES)');
    str.push(']');

    this._content = str.join('\n');
    return this._content;
  }


  async save() {
    return FileUtils.writeFile(this._file, this._content);
  }


}
