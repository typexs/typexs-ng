import {Component} from '@angular/core';
import {ContentComponent} from '../../../libs/content/decorators/ContentComponent';
import {ContentPart} from '../../../libs/content/decorators/ContentPart';
import {TreeObject} from '../../../libs/content/TreeObject';
import {AbstractComponent} from '../../xsview/AbstractComponent';


@ContentPart('search-result')
export class SearchResult extends TreeObject {
  type = 'search-result';
}

@ContentComponent('search-result')
@Component({
  selector: 'search-result',
  templateUrl: 'search-result.component.html',

})
export class SearchResultComponent extends AbstractComponent<SearchResult> {

  title = 'SuperSearch'
}
