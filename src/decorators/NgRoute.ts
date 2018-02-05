import * as _ from 'lodash';
import {MetaArgs} from "typexs-base";
import {Route} from "@angular/router";
import {Type} from "@angular/core/core";
import {K_NG_ROUTES} from "../types";


export function NgRoute(path: string | Route) {
  return function (object: Function) {
    let r: Route = {};
    if (_.isString(path)) {
      r = {path: path};
    } else {
      r = path
    }
    r.component = <Type<any>>object;
    MetaArgs.key(K_NG_ROUTES).push(r);
  };
}
