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


    }
  }
}
