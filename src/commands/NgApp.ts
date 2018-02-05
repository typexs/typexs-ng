import {Log, Storage, Inject, Container, Config, PlatformUtils} from "typexs-base";

export class NgAppCommand {

  command = "ng [op]";
  aliases = "ng";
  describe = "Ng App";


  builder(yargs: any) {
    return yargs
  }

  async handler(argv: any) {
    let appName = Config.get('app.name', 'dummy');
    let appPath = Config.get('app.path', '.');

    if (argv.op === 'new') {

      let dir = PlatformUtils.join(appPath, 'build', 'out-app');
      await PlatformUtils.deleteDirectory(dir);
      PlatformUtils.mkdir(dir);


      let commandOptions = {
        skipGit: true,
        directory: appName,
        skipCommit: true,
        skipInstall: true,
        name: appName,
        collectionName: '@schematics/angular'
      };

      let UI = require('@angular/cli/ember-cli/lib/ui');
      let _ui = new UI({outputStream: process.stdout, inputStream: process.stdin, errorStream: process.stderr});
      let Project = require('@angular/cli/ember-cli/lib/models/project');
      const InitTask = require('@angular/cli/tasks/init').default;
      let p = new Project(dir, {}, _ui);
      const initTask = new InitTask({
        project: p,
        ui: _ui
      });

      await initTask.run(commandOptions);

    } else if (argv.op === 'new2') {


    }
  }
}
