  import * as _ from 'lodash';
import {Component, ComponentFactoryResolver, EmbeddedViewRef, Inject, Injector, ViewChild} from '@angular/core';
import {ViewContent} from '../../../../../libs/views/decorators/ViewContent';
import {TreeObject} from '../../../../../libs/views/TreeObject';
import {ViewComponent} from '../../../../../libs/views/decorators/ViewComponent';
import {AbstractComponent} from '../../../../base/component/AbstractComponent';
import {ClassUtils} from '@allgemein/base';
  import {EntityResolverService} from '../../../../base/services/entity-resolver.service';
  import {ComponentRegistry} from '../../../../../libs/views/ComponentRegistry';


@ViewContent('search-entry')
export class SearchEntry extends TreeObject {
  type: string = 'search-entry';

  nr: number = 1;

  instance: any;

  constructor(nr: number, data: any) {
    super();
    this.nr = nr;
    this.getChildren().push(data);
  }

}


@ViewComponent('search-entry')
@Component({
  selector: 'search-entry',
  templateUrl: 'search-entry.component.html',
  styleUrls: ['search-entry.component.scss']
})
export class SearchEntryComponent extends AbstractComponent<SearchEntry> {

  title = 'SuperSearch';

  @ViewChild('content', {static: false})
  child: any;

  constructor(@Inject(Injector) public injector: Injector,
              @Inject(ComponentFactoryResolver) public r: ComponentFactoryResolver) {
    super(injector, r);
  }

  get nr() {
    if (this.getInstance()) {
      return this.getInstance().nr;
    }
    return -999;

  }


  get type() {
    const comp = this.getViewContainerRef();
    // if(comp['getInstance'])
    // comp.element
    const viewRef = comp.get(0) as EmbeddedViewRef<any>;
    const nodes = viewRef && _.has(viewRef, '_view.nodes') ? _.find(viewRef['_view'].nodes, x => !!x.instance) : null;
    if (nodes && nodes.instance) {
      return ComponentRegistry.getClassName(nodes.instance.getInstance());
    }

    return 'unknown';
  }
}
