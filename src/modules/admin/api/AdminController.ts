import * as _ from "lodash";
import {Inject, RuntimeLoader} from "typexs-base";
import {ContextGroup, JsonController,Get} from "typexs-server";


@ContextGroup("api")
@JsonController("/admin")
export class AdminController {

  @Inject("RuntimeLoader")
  loader: RuntimeLoader;


  @Get('/modules')
  listModules():string[]{
    let modules = this.loader.registry.modules();
    return _.map(modules, m => {
      return m.name;
    })
  }


}
