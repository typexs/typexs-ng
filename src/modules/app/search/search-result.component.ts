import {Component} from '@angular/core';
import {AbstractComponent} from '../../xsview/AbstractComponent';
import {TreeObject} from '../../xsview/TreeObject';
import {ViewContent} from '../../xsview/decorators/ViewContent';
import {ViewComponent} from '../../xsview/decorators/ViewComponent';


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
