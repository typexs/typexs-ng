import {Config, FileUtils, Module, Inject, RuntimeLoader, Log} from "typexs-base";
import {NgMetaDataCollector} from "../libs/angular/NgMetaDataCollector";
import {NgModuleBuilder} from "../libs/angular/NgModuleBuilder";
import * as glob from 'glob';
import {join} from 'path';

import * as _ from 'lodash';
import {ITemplateEntry} from "..";
import {IStylesheetEntry} from "../libs/angular/IStylesheetEntry";


export class Ng {

  command = "ng [op]";
  aliases = "ng";
  describe = "Ng prebuild ";


  @Inject()
  collector: NgMetaDataCollector;

  @Inject("RuntimeLoader")
  loader: RuntimeLoader;


  builder(yargs: any) {
    return yargs
  }

  async handler(argv: any) {
    let appName = Config.get('app.name', 'dummy');
    let appPath = Config.get('app.path', '.');

    switch (argv.op) {
      case 'build-modules':
        return this.ngBuild();
      case 'build-themes':
        return this.ngThemes();
    }
  }


  async ngThemes() {
    this.generateTemplateFile();
    this.generateStylesheetFile();
  }


  /**
   * Generate src/app/stylesheets.ts file
   *
   * @returns {Promise<void>}
   */
  private generateStylesheetFile() {
    let modules = this.loader.registry.modules();
    let stylesheets = [];

    let currentModule: Module;

    for (let _module of modules) {
      let minmatch = '' + _module.path + '/?(src)/app/themes/**/*.+(css|less|sass|scss)';
      currentModule = _module;
      let files = glob.sync(minmatch);
      if (_.isEmpty(files)) continue;


      for (let file of files) {
        let strippedPath = file.replace(_module.path, '');
        let themePath = strippedPath.split('/app/themes/').pop();
        let themeName = themePath.split('/').shift();
        let fileName = themePath.split('/').pop();

        let matchResult = fileName.match(/^(.*)\.(override|append)\.(css|less|sass|scss)$/);
        if (matchResult && matchResult.length === 3) {
          let stylesheet: IStylesheetEntry = {
            theme: themeName,
            name: matchResult[1],
            subcontext: matchResult[2],
            type: matchResult[3],
            stylesheet: `require('./themes/${themePath}')`
          };
          stylesheets.push(stylesheet);
        }
      }
    }

    let content = JSON.stringify(stylesheets, null, 2);
    content = content.replace(/\"(require\(.*\))\"/g, "$1");
    let lines = ['/**', ' * GENERATED BY "typexs ng build-themes"',
      ' * MODIFICATIONS WILL GET LOST ON NEXT GENERATION', ' */'];

    if (currentModule.name === 'typexs-ng') {
      lines.push("import {IStylesheetEntry} from '../libs/angular/IStylesheetEntry';")
    } else {
      lines.push("import {IStylesheetEntry} from 'typexs-ng';")
    }
    lines.push('');
    lines.push('export const STYLES: IStylesheetEntry[] =');
    lines.push(content + ';');

    content = lines.join('\n');

    const stylesheetFileName = join(currentModule.path, 'src', 'app', 'stylesheets.ts');
    FileUtils.writeFileSync(stylesheetFileName, content);
    Log.info('Updated ' + stylesheetFileName);
  }


  /**
   * Generate src/app/themes.ts file
   *
   * @returns {Promise<void>}
   */
  private generateTemplateFile() {
    let modules = this.loader.registry.modules();
    let templeted = [];

    let currentModule: Module;

    for (let _module of modules) {
      let minmatch = '' + _module.path + '/?(src)/app/themes/**/*.html';
      currentModule = _module;
      let files = glob.sync(minmatch);
      if (_.isEmpty(files)) continue;


      for (let file of files) {
        let strippedPath = file.replace(_module.path, '');
        let themePath = strippedPath.split('/app/themes/').pop();
        let themeName = themePath.split('/').shift();
        let fileName = themePath.split('/').pop();

        let matchResult = fileName.match(/^(.*)\.(component)\.html$/);
        if (matchResult && matchResult.length === 3) {
          let template: ITemplateEntry = {
            theme: themeName,
            name: matchResult[1],
            type: matchResult[2],
            template: `require('./themes/${themePath}')`
          };
          templeted.push(template);
        }
      }
    }


    let content = JSON.stringify(templeted, null, 2);
    content = content.replace(/\"(require\(.*\))\"/g, "$1");
    let lines = ['/**', ' * GENERATED BY "typexs ng build-themes"',
      ' * MODIFICATIONS WILL GET LOST ON NEXT GENERATION', ' */'];

    if (currentModule.name === 'typexs-ng') {
      lines.push("import {ITemplateEntry} from '../libs/angular/ITemplateEntry';")
    } else {
      lines.push("import {ITemplateEntry} from 'typexs-ng';")
    }
    lines.push('');
    lines.push('export const THEMES: ITemplateEntry[] =');
    lines.push(content + ';');

    content = lines.join('\n');

    const themeFileName = join(currentModule.path, 'src', 'app', 'themes.ts');
    FileUtils.writeFileSync(themeFileName, content);
    Log.info('Updated ' + themeFileName);

  }


  /**
   * Generate src/modules/app/app.used.modules.ts
   *
   * @returns {Promise<void>}
   */
  async ngBuild() {
    // TODO check if modules are enabled
    let modules = this.collector.collectNgModules();
    let builder = new NgModuleBuilder();
    builder.addModules(modules);

    let content = builder.build();
    console.log(content)

    await builder.save();
  }
}
