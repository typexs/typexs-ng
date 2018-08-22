import {Component} from '@angular/core';
import {TreeObject} from '../../../libs/xsview/TreeObject';
import {ViewContent} from '../../../libs/xsview/decorators/ViewContent';
import {ViewComponent} from '../../../libs/xsview/decorators/ViewComponent';
import {AbstractComponent} from '../../../libs/xsview/AbstractComponent';


@ViewContent('search-result')
export class SearchResult extends TreeObject {
  type = 'search-result';
}

@ViewComponent('search-result')
@Component({
  selector: 'search-result',
  templateUrl: 'search-result.component.html',

})
export class SearchResultComponent extends AbstractComponent<SearchResult> {


  title = 'SuperSearch'
}
