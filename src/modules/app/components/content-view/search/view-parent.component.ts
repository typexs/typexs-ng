import {AfterViewInit, Component, ComponentFactoryResolver, Inject, Injector, OnInit, ViewChild} from '@angular/core';
import {SearchEntryComponent} from './search-entry.component';
import {TreeObject} from '../../../../../libs/views/TreeObject';
import {ViewContent} from '../../../../../libs/views/decorators/ViewContent';
import {ViewComponent} from '../../../../../libs/views/decorators/ViewComponent';
import {AbstractComponent} from '../../../../base/component/AbstractComponent';


@ViewContent('view-parent')
export class ViewParent extends TreeObject {
  type = 'view-parent';
}

@ViewComponent('view-parent')
@Component({
  selector: 'view-parent',
  templateUrl: 'view-parent.component.html',

})
export class ViewParentComponent extends AbstractComponent<ViewParent> implements AfterViewInit, OnInit {

  @ViewChild(SearchEntryComponent, {static: true})
  searchEntry: SearchEntryComponent;

  searchEntry2: SearchEntryComponent;

  title = 'ViewParent';


  constructor(@Inject(Injector) public injector: Injector,
              @Inject(ComponentFactoryResolver) public r: ComponentFactoryResolver) {
    super(injector, r);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }


}
