import {Component, ComponentFactoryResolver, Inject, Injector} from '@angular/core';
import {ViewContent} from '../../../../../libs/views/decorators/ViewContent';
import {TreeObject} from '../../../../../libs/views/TreeObject';
import {ViewComponent} from '../../../../../libs/views/decorators/ViewComponent';
import {AbstractComponent} from '../../../../base/component/AbstractComponent';


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


  title = 'SuperSearch';

  constructor(@Inject(Injector) public injector: Injector,
              @Inject(ComponentFactoryResolver) public r: ComponentFactoryResolver) {
    super(injector, r);
  }

}
