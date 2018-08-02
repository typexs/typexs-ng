import {Component, ViewChild} from '@angular/core';
import {AbstractComponent} from '../../xsview/AbstractComponent';
import {ViewContent} from '../../xsview/decorators/ViewContent';
import {ViewComponent} from '../../xsview/decorators/ViewComponent';
import {TreeObject} from '../../xsview/TreeObject';



@ViewContent('search-entry')
export class SearchEntry extends TreeObject {
  type:string = 'search-entry';

  nr: number = 1;

  constructor(nr: number) {
    super();
    this.nr = nr;
  }

}


@ViewComponent('search-entry')
@Component({
  selector: 'search-entry',
  templateUrl: 'search-entry.component.html',

})
export class SearchEntryComponent extends AbstractComponent<SearchEntry> {

  title = 'SuperSearch';



  get nr() {
    if(this.elem){
      return this.elem.nr;
    }
    return -999;

  }
}
