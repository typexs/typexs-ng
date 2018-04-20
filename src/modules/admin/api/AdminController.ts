import * as _ from "lodash";
import {Inject, RuntimeLoader,Config} from "typexs-base";
import {ContextGroup, JsonController,Get,Authorized} from "typexs-server";


@ContextGroup("api")
@JsonController("/admin")
export class AdminController {


  @Inject("RuntimeLoader")
  loader: RuntimeLoader;


  @Authorized()
  @Get('/modules')
  listModules():string[]{
    let modules = this.loader.registry.modules();
    return _.map(modules, m => {
      return m.name;
    })
  }

  @Authorized()
  @Get('/config')
  getConfig():any{
    let cfg = Config.get();


    return cfg;
  }

}
