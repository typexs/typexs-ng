import {Component} from '@angular/core';
import {ContentComponent} from '../../../libs/content/decorators/ContentComponent';
import {AbstractComponent} from '../../../libs/content/AbstractComponent';
import {SearchResult} from '../content-demo.component';

@ContentComponent('search-result')
@Component({
  selector: 'search-result',
  templateUrl: 'search-result.component.html',

})
export class SearchResultComponent extends AbstractComponent<SearchResult> {

  title = 'SuperSearch'
}
