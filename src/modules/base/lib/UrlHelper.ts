import * as _ from 'lodash';
import {IClassRef, IEntityRef, IPropertyRef} from 'commons-schema-api';

export class UrlHelper {

  static replace(url: string, replace: any = null) {
    if (replace) {
      _.keys(replace).forEach(k => {
        url = url.replace(':' + k, replace[k]);
      });
    }
    return url;
  }

  // static buildLookupConditions(e: IEntityRef, res: any) {
  //   return Expressions.buildLookupConditions(e, res);
  // }

  /**
   * Copy from commons-expressions
   *
   * @param ref
   * @param data
   */
  static buildLookupConditions(ref: IClassRef | IEntityRef, data: any | any[]) {
    const idProps = ref.getPropertyRefs().filter(p => p.isIdentifier());
    if (_.isArray(data)) {
      const collect: string[] = [];
      data.forEach(d => {
        collect.push(this._buildLookupconditions(idProps, d));
      });
      if (idProps.length > 1) {
        return `(${collect.join('),(')})`;
      } else {
        return `${collect.join(',')}`;
      }
    } else {
      return this._buildLookupconditions(idProps, data);
    }
  }

  static buildId(data: { [k: string]: any }) {
    return _.values(data).join(',');
  }


  private static _buildLookupconditions(idProps: IPropertyRef[], data: any) {
    const idPk: string[] = [];
    idProps.forEach(id => {
      const v = id.get(data);
      if (_.isString(v)) {
        // idPk.push('\'' + v + '\'');
        idPk.push(v);
      } else {
        idPk.push(v);
      }
    });
    return idPk.join(',');

  }


}
