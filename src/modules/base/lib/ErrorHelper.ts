import * as _ from 'lodash';

export class ErrorHelper {

  static detectErrors(data: any) {
    if (_.isArray(data)) {
      const errors = [];
      for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        const e = this.detectError(entry);
        if (e) {
          _.assign(e, {
            index: i,
            nodeId: entry.nodeId,
            instNr: entry.instNr,
          });
          errors.push(e);
        }
      }
      return errors;
    } else {
      const e = this.detectError(data);
      if (e) {
        _.assign(e, {
          index: null,
          nodeId: data.nodeId,
          instNr: data.instNr,
        });
        return [e];
      } else {
        return [];
      }
    }
  }


  static detectError(entry: any) {
    if (_.has(entry, 'error') && _.has(entry, 'message')) {
      return new Error(entry.message);
    }
    return null;

  }
}
