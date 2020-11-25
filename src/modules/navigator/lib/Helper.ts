import * as _ from 'lodash';
import {Route} from '@angular/router';

export function isLazyLoading(route: Route) {
  return _.has(route, 'loadChildren') || _.has(route, '_loadedConfig');
}
