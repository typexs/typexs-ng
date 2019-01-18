import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {Pager} from './Pager';


@Injectable()
export class PagerService {

  pagers: Pager[] = [];

  find(id: string) {
    return _.find(this.pagers, p => p.name == id);
  }

  get(id: string) {
    let pager = this.find(id);
    if (!pager) {
      pager = new Pager(id);
      this.pagers.push(pager);
    }
    pager.inc();
    return pager;
  }


  remove(id: string) {
    let pager = this.find(id);
    if (pager) {
      pager.dec();
      if (pager.free()) {
        _.remove(this.pagers, p => p.name == id);
      }
    }
  }

}
