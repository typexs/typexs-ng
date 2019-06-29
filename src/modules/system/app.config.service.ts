import * as _ from 'lodash';
import {Injectable} from '@angular/core';


@Injectable()
export class AppConfigService {

  // gridComponent = SimpleHtmlTableComponent;

  components: { [name: string]: Function } = {};

  getComponentClass(...args: string[]) {
    const name = args.join('.');
    return _.get(this.components, name);
  }

  setComponentClass(name: string | string[], fn: Function) {
    if (_.isArray(name)) {
      name = name.join('.');
    }
    return _.set(this.components, name, fn);
  }

}
