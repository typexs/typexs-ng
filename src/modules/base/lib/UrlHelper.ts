import * as _ from 'lodash';

export class UrlHelper {

  static replace(url: string, replace: any = null) {
    if (replace) {
      _.keys(replace).forEach(k => {
        url = url.replace(':' + k, replace[k]);
      });
    }
    return url;
  }

}
