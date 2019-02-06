import * as _ from 'lodash';
import {Route} from '@angular/router';
import {Type} from '@angular/core/core';
import {MetaArgs} from 'commons-base/browser';

export const K_NG_ROUTES = 'ng_routes';

export function NgRoute(path: string | Route) {
  return function (object: Function) {
    let r: Route = {};
    if (_.isString(path)) {
      r.path = <string>path;
    } else {
      r = <Route>path;
    }
    r.component = <Type<any>>object;
    MetaArgs.key(K_NG_ROUTES).push(r);
  };
}

