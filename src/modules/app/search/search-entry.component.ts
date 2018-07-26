import {Component} from '@angular/core';
import {ContentComponent} from '../../../libs/content/decorators/ContentComponent';
import {AbstractComponent} from '../../../libs/content/AbstractComponent';

import {ContentPart} from '../../../libs/content/decorators/ContentPart';
import {TreeObject} from '../../../libs/content/TreeObject';


@ContentPart('search-entry')
export class SearchEntry extends TreeObject {
  type:string = 'search-entry';

  nr: number = 1;

  constructor(nr: number) {
    super();
    this.nr = nr;
  }

}


@ContentComponent('search-entry')
@Component({
  selector: 'search-entry',
  templateUrl: 'search-entry.component.html',

})
export class SearchEntryComponent extends AbstractComponent<SearchEntry> {

  title = 'SuperSearch';


  get nr() {
    return this.elem.nr;
  }
}
